import { Loader } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { MatchEntity, PlayerStub, hydrateScore } from "../../data/entities";
import getHandicap from "../../helpers/getHandicap";

export const Result = (props: { player: PlayerStub; match: MatchEntity }) => {
  const [playerAdjustedScore, setPlayerAdjustedScore] = useState<
    number | string
  >();
  const [opponentAdjustedScore, setOpponentAdjustedScore] = useState<
    number | string
  >();
  useEffect(() => {
    const setup = async () => {
      const scoreEntityPromises = props.match.scores.map((score) =>
        hydrateScore(score.id),
      );
      const scoreEntities = await Promise.all(scoreEntityPromises);
      const playerScore = scoreEntities.find(
        (score) => score.player.id === props.player.id,
      );
      if (!playerScore) {
        setPlayerAdjustedScore("-");
      } else {
        const playerHandicap = await getHandicap(
          props.player,
          props.match.date,
        );
        setPlayerAdjustedScore(playerScore!.score - playerHandicap);
      }

      const opponentPlayer = props.match.players.find(
        (player) => player.id !== props.player.id,
      )!;
      const opponentScore = scoreEntities.find(
        (score) => score.player.id !== props.player.id,
      );
      if (!opponentScore) {
        setOpponentAdjustedScore("-");
      } else {
        const opponentHandicap = await getHandicap(
          opponentPlayer,
          props.match.date,
        );
        setOpponentAdjustedScore(opponentScore!.score - opponentHandicap);
      }
    };
    setup();
  }, [props.match.scores]);

  if (
    playerAdjustedScore === undefined ||
    opponentAdjustedScore === undefined
  ) {
    return <Loader />;
  }

  const playerAdjustedScoreNumber =
    playerAdjustedScore === "-" ? 1000000 : playerAdjustedScore;
  const opponentAdjustedScoreNumber =
    opponentAdjustedScore === "-" ? 1000000 : opponentAdjustedScore;

  return (
    <>
      {playerAdjustedScoreNumber < opponentAdjustedScoreNumber
        ? "⭐"
        : playerAdjustedScoreNumber == opponentAdjustedScoreNumber
          ? "👔"
          : "💩"}
    </>
  );
};
