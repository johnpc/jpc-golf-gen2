import { Loader } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import {
  PlayerEntity,
  PlayerStub,
  hydratePlayer,
  scoreListener,
  unsubscribeListener,
} from "../../data/entities";
import getHandicap from "../../helpers/getHandicap";

export const Handicap = (props: {
  player: PlayerEntity | PlayerStub;
  date?: Date;
}) => {
  const [handicap, setHandicap] = useState<number>();
  useEffect(() => {
    const setup = async () => {
      const playerEntity = (props.player as PlayerEntity).matches
        ? (props.player as PlayerEntity)
        : await hydratePlayer(props.player.id);
      const h = await getHandicap(playerEntity, props.date);
      setHandicap(h);
    };
    setup();
    const listener = scoreListener(setup);
    return () => {
      unsubscribeListener(listener);
    };
  }, []);

  if (handicap === undefined) {
    return <Loader />;
  }

  return <>{handicap}</>;
};
