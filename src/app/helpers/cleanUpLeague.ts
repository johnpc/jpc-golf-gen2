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
  const deletedPlayers = await Promise.all(deletePlayerPromises);
  console.log({
    deletedPlayers,
    errors: deletedPlayers.find((m) => m)?.errors,
  });

  const deleteScorePromises = scoresToDelete.map((score) => deleteScore(score));
  const deletedScores = await Promise.all(deleteScorePromises);
  console.log({ deletedScores, errors: deletedScores.find((m) => m)?.errors });

  const deleteMatchPromises = matchesToDelete.map((match) =>
    deleteMatch(match),
  );
  const deletedMatches = await Promise.all(deleteMatchPromises);
  console.log({
    deletedMatches,
    errors: deletedMatches.find((m) => m)?.errors,
  });

  const deletedLeague = await deleteLeague(league);
  console.log({ deletedLeague, errors: deletedLeague.errors });
};
