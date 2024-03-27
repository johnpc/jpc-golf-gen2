import { Loader } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { MatchEntity, PlayerStub, hydrateScore } from "../../data/entities";
import getHandicap from "../../helpers/getHandicap";

export const Result = (props: { player: PlayerStub; match: MatchEntity }) => {
  const [playerAdjustedScore, setPlayerAdjustedScore] = useState<number>();
  const [opponentAdjustedScore, setOpponentAdjustedScore] = useState<number>();
  useEffect(() => {
    const setup = async () => {
      const scoreEntityPromises = props.match.scores.map((score) =>
        hydrateScore(score.id),
      );
      const scoreEntities = await Promise.all(scoreEntityPromises);
      const playerScore = scoreEntities.find(
        (score) => score.player.id === props.player.id,
      );
      const playerHandicap = await getHandicap(props.player, props.match.date);
      setPlayerAdjustedScore(playerScore!.score - playerHandicap);

      const opponentPlayer = props.match.players.find(
        (player) => player.id !== props.player.id,
      )!;
      const opponentScore = scoreEntities.find(
        (score) => score.player.id !== props.player.id,
      );
      const opponentHandicap = await getHandicap(
        opponentPlayer,
        props.match.date,
      );
      setOpponentAdjustedScore(opponentScore!.score - opponentHandicap);
    };
    setup();
  }, []);

  if (
    playerAdjustedScore === undefined ||
    opponentAdjustedScore === undefined
  ) {
    return <Loader />;
  }

  return (
    <>
      {playerAdjustedScore < opponentAdjustedScore
        ? "⭐"
        : playerAdjustedScore == opponentAdjustedScore
          ? "👔"
          : "💩"}
    </>
  );
};
