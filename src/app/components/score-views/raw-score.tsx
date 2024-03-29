import { Loader } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { MatchEntity, PlayerStub, hydrateScore } from "../../data/entities";

export const RawScore = (props: { player: PlayerStub; match: MatchEntity }) => {
  const [rawScore, setRawScore] = useState<number | string>();
  useEffect(() => {
    const setup = async () => {
      const scoreEntityPromises = props.match.scores.map((score) =>
        hydrateScore(score.id),
      );
      const scoreEntities = await Promise.all(scoreEntityPromises);
      const playerScore = scoreEntities.find(
        (score) => score.player.id === props.player.id,
      );
      setRawScore(playerScore?.score ?? "-");
    };
    setup();
  }, [props.match.scores]);

  if (rawScore === undefined) {
    return <Loader />;
  }

  return <>{rawScore}</>;
};
