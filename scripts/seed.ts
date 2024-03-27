import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../amplify/data/resource";
import config from "../amplifyconfiguration.json";
import { PlayerEntity, createPlayer } from "@/app/data/entities";

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_PER_WEEK = MS_PER_DAY * 7;

Amplify.configure(config);
const client = generateClient<Schema>({
  authMode: "iam",
});

const seedPlayers = async () => {
  // First remove whatever existing players
  const players = await client.models.Player.list({
    limit: 10000,
  });
  const deletePlayerPromises = players.data.map((player) =>
    client.models.Player.delete({ id: player.id }),
  );
  await Promise.all(deletePlayerPromises);

  const playerNames = [
    "Emily",
    "Yeon",
    "John",
    "James",
    "Alex",
    "Josh",
    "Eric",
    "Kody",
  ];

  return await Promise.all(
    playerNames.map(
      async (playerName) =>
        await createPlayer({
          name: playerName,
          email: `${playerName}@gmail.com`,
        }),
    ),
  );
};

const getRandomPlayer = (players: PlayerEntity[]): PlayerEntity => {
  return players[Math.floor(Math.random() * players.length)];
};

const setupMatches = async (
  players: PlayerEntity[],
  numWeeks: number,
  firstMatchDate: Date,
) => {
  // First remove whatever existing matches
  const matches = await client.models.Match.list({
    limit: 10000,
  });
  const deleteMatchPromises = matches.data.map((match) =>
    client.models.Match.delete({ id: match.id }),
  );
  await Promise.all(deleteMatchPromises);

  // Then create new ones
  const allPromises = Array.from(Array(numWeeks)).map(async (_, weekNumber) => {
    const matchDate = firstMatchDate.getTime() + MS_PER_WEEK * weekNumber;
    let playersCopy = [...players];
    const numberOfMatchups = Math.floor(players.length / 2);
    const matchUps = Array.from(Array(numberOfMatchups)).map(() => {
      const randomPlayer1 = getRandomPlayer(playersCopy);
      playersCopy = playersCopy.filter(
        (player) => player.id !== randomPlayer1.id,
      );
      const randomPlayer2 = getRandomPlayer(playersCopy);
      playersCopy = playersCopy.filter(
        (player) => player.id !== randomPlayer2.id,
      );
      return [randomPlayer1, randomPlayer2];
    });

    const promises = matchUps.map(async (matchUp) => {
      console.log(
        `Creating match: ${matchUp?.[0]?.name} vs ${matchUp?.[1]?.name} on ${new Date(matchDate).toISOString()}`,
      );
      const createdMatch = await client.models.Match.create({
        date: new Date(matchDate).toISOString(),
      });
      await client.models.PlayerMatch.create({
        matchId: createdMatch.data.id,
        playerId: matchUp[0].id,
      });
      await client.models.PlayerMatch.create({
        matchId: createdMatch.data.id,
        playerId: matchUp[1].id,
      });
    });

    await Promise.all(promises);
  });
  await Promise.all(allPromises);
};

const main = async () => {
  const playerEntities = await seedPlayers();
  await setupMatches(playerEntities, 2, new Date());
};
main();
