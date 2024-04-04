import {
  LeagueEntity,
  PlayerEntity,
  createLeague,
  createMatch,
  createPlayer,
} from "../data/entities";
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_PER_WEEK = MS_PER_DAY * 7;

const getRandomPlayer = (players: PlayerEntity[]): PlayerEntity => {
  return players[Math.floor(Math.random() * players.length)];
};

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
      return createMatch(league, matchUp, new Date(matchDate));
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
