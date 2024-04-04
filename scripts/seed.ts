import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../amplify/data/resource";
import config from "../amplifyconfiguration.json";
import dotenv from "dotenv";
import { buildLeague } from "@/app/helpers/buildLeague";
import { CacheSingleton } from "@/app/data/cache-singleton";
dotenv.config();

Amplify.configure(config);
const client = generateClient<Schema>({
  authMode: "lambda",
  authToken: process.env.ADMIN_API_KEY!,
});

const cleanUp = async () => {
  const leagues = await client.models.League.list({
    limit: 10000,
  });
  const deleteLeaguePromises = leagues.data.map((league: Schema["League"]) =>
    client.models.League.delete({ id: league.id }),
  );
  await Promise.all(deleteLeaguePromises);

  const matches = await client.models.Match.list({
    limit: 10000,
  });
  const deleteMatchPromises = matches.data.map((match: Schema["Match"]) =>
    client.models.Match.delete({ id: match.id }),
  );
  await Promise.all(deleteMatchPromises);

  const players = await client.models.Player.list({
    limit: 10000,
  });
  const deletePlayerPromises = players.data.map((player: Schema["Player"]) =>
    client.models.Player.delete({ id: player.id }),
  );
  await Promise.all(deletePlayerPromises);

  const scores = await client.models.Score.list({
    limit: 10000,
  });
  const deleteScorePromises = scores.data.map((score: Schema["Score"]) =>
    client.models.Score.delete({ id: score.id }),
  );
  await Promise.all(deleteScorePromises);
};

const main = async (playerNames: string[]) => {
  const cacheInstance = await CacheSingleton.getInstance();
  await cacheInstance.initialize(client);
  await cleanUp();
  const numLeaguesToCreate = 2;
  const numWeeksPerLeague = 4;
  const promises = Array.from(Array(numLeaguesToCreate)).map(
    async (_, leagueNumber) => {
      return await buildLeague(
        `Test League ${leagueNumber}`,
        new Date(),
        numWeeksPerLeague,
        playerNames,
      );
    },
  );
  await Promise.all(promises);
};
const playerNames = [
  "Emily", // The Purple Jacket
  "Yeon", // Yoink
  "John", // Chef boy-r-d
  "James", // Cpt Insano
  "Josh", // Sir Mix A Lot - Eight Iron
  "Jamas", // Mas
  "Kody", // Xyllor
  "Nobody", // Free Win
];

main(playerNames);
