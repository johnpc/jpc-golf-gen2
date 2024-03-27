import {
  PlayerEntity,
  MatchStub,
  hydrateMatch,
  hydrateScore,
} from "../data/entities";
import getHandicap from "./getHandicap";

const fetchMatches = async (matchStubs: MatchStub[]) => {
  return await Promise.all(
    matchStubs.map((matchStub) => hydrateMatch(matchStub.id)),
  );
};

const getLeaguePoints = async (player: PlayerEntity): Promise<number> => {
  const wonOrLostMatchPromises = (await fetchMatches(player.matches)).map(
    async (match) => {
      const scoresPromises = match.scores.map((scoreStub) =>
        hydrateScore(scoreStub.id),
      );
      const scores = await Promise.all(scoresPromises);

      const playerScore = scores.find((score) => score.player.id === player.id);
      if (!playerScore) {
        // If the player didn't play the match, no points.
        return false;
      }

      const playerHandicap = await getHandicap(player, match.date);
      const playerEffectiveScore = playerScore.score - playerHandicap;

      const otherPlayerScore = scores.find(
        (score) => score.player.id !== player.id,
      );
      if (!otherPlayerScore) {
        // If the opponent didn't play the match, free points!
        return true;
      }
      const otherPlayerHandicap = await getHandicap(
        otherPlayerScore?.player,
        match.date,
      );
      const otherPlayerEffectiveScore =
        otherPlayerScore.score - otherPlayerHandicap;

      return playerEffectiveScore > otherPlayerEffectiveScore;
    },
  );

  const wonOrLostMatches = await Promise.all(wonOrLostMatchPromises);
  return wonOrLostMatches.filter((won) => won).length;
};

export default getLeaguePoints;
