import {
  PlayerEntity,
  PlayerStub,
  ScoreEntity,
  ScoreStub,
  hydratePlayer,
  hydrateScore,
} from "../data/entities";

// A higher adjustment factor tends to benefit higher handicap golfers.
// Typically, ~0.8 is recommended, but we like our bad golf.
const HANDICAP_ADJUSTMENT_FACTOR = 1;
const fetchScores = async (scoreStubs: ScoreStub[]) => {
  return await Promise.all(
    scoreStubs.map((scoreStub) => hydrateScore(scoreStub.id)),
  );
};

const getHandicap = async (
  player: PlayerEntity | PlayerStub,
  thruDate?: Date,
): Promise<number> => {
  const playerEntity = (player as PlayerEntity).matches
    ? (player as PlayerEntity)
    : await hydratePlayer(player.id);
  const scores = (await fetchScores(playerEntity.scores)).filter((score) => {
    if (!thruDate) {
      return true;
    }
    return score.match.date.getTime() <= thruDate.getTime() - 100;
  });

  if (scores.length < 1 || !scores) {
    return 0;
  }

  const handicap =
    scores.reduce(
      (total: number, score: ScoreEntity) => total + score.score,
      0,
    ) / scores.length;
  return parseFloat((handicap * HANDICAP_ADJUSTMENT_FACTOR).toFixed(2));
};

export default getHandicap;
