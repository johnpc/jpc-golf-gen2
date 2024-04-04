import {
  LeagueEntity,
  deleteLeague,
  deleteMatch,
  deletePlayer,
  deleteScore,
  listMatches,
  listPlayers,
  listScores,
} from "../data/entities";

export const cleanUpLeague = async (league: LeagueEntity): Promise<void> => {
  const playersToDelete = await listPlayers(league);
  const scoresToDelete = await listScores(league);
  const matchesToDelete = await listMatches(league);

  const deletePlayerPromises = playersToDelete.map((player) =>
    deletePlayer(player),
  );
  await Promise.all(deletePlayerPromises);

  const deleteScorePromises = scoresToDelete.map((score) => deleteScore(score));
  await Promise.all(deleteScorePromises);

  const deleteMatchPromises = matchesToDelete.map((match) =>
    deleteMatch(match),
  );
  await Promise.all(deleteMatchPromises);

  await deleteLeague(league);
};
