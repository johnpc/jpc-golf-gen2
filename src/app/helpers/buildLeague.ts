import {
  LeagueEntity,
  PlayerEntity,
  createLeague,
  createMatch,
  createPlayer,
} from "../data/entities";
import roundrobin from "roundrobin";

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_PER_WEEK = MS_PER_DAY * 7;

const seedPlayers = async (league: LeagueEntity, playerNames: string[]) => {
  const playerEntities = [];
  for (const name of playerNames) {
    const player = await createPlayer(league, name, `${name}@gmail.com`);
    playerEntities.push(player);
  }
  return playerEntities;
};

const setupMatches = async (
  league: LeagueEntity,
  players: PlayerEntity[],
  numWeeks: number,
  firstMatchDate: Date,
) => {
  const rrs = roundrobin(
    players.length,
    players.map((player) => player.id),
  ) as [string, string][];
  console.log({ rrs });
  const allPromises = Array.from(Array(numWeeks)).map(async (_, weekNumber) => {
    const matchDate = firstMatchDate.getTime() + MS_PER_WEEK * weekNumber;
    const matchUps = rrs[weekNumber]
      ? rrs[weekNumber]
      : rrs[weekNumber - rrs.length];
    const promises = matchUps.map(async (matchUp) => {
      const player1 = players.find((player) => player.id === matchUp[0])!;
      const player2 = players.find((player) => player.id === matchUp[1])!;
      console.log(
        `Creating match: ${player1.name} vs ${player2.name} on ${new Date(matchDate).toISOString()}`,
      );
      return createMatch(league, [player1, player2], new Date(matchDate));
    });
    await Promise.all(promises);
  });
  await Promise.all(allPromises);
};

export const buildLeague = async (
  leagueName: string,
  startDate: Date,
  numWeeks: number,
  playerNames: string[],
): Promise<LeagueEntity> => {
  const league = await createLeague(leagueName);
  const players = await seedPlayers(league, playerNames);
  await setupMatches(league, players, numWeeks, startDate);
  return league;
};
