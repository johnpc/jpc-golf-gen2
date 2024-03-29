import { Loader } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { MatchEntity, PlayerStub, hydrateScore } from "../../data/entities";
import getHandicap from "../../helpers/getHandicap";

export const AdjustedScore = (props: {
  player: PlayerStub;
  match: MatchEntity;
}) => {
  const [adjustedScore, setAdjustedScore] = useState<number | string>();
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
        setAdjustedScore("-");
        return;
      }

      const playerHandicap = await getHandicap(props.player, props.match.date);
      setAdjustedScore(playerScore!.score - playerHandicap);
    };
    setup();
  }, [props.match.scores]);

  if (adjustedScore === undefined) {
    return <Loader />;
  }

  return <>{adjustedScore}</>;
};
