import { Loader } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import {
  LeagueEntity,
  MatchEntity,
  listMatches,
  scoreListener,
  unsubscribeListener,
} from "../data/entities";
import { MatchResult } from "./match-result";

export const Results = (props: { league: LeagueEntity }) => {
  const [matches, setMatches] = useState<MatchEntity[]>([]);
  useEffect(() => {
    const setup = async () => {
      const fetchedMatches = await listMatches(props.league);
      setMatches(fetchedMatches);
    };
    setup();
    const listener = scoreListener(setup);
    return () => {
      unsubscribeListener(listener);
    };
  }, [props.league]);
  if (matches.length === 0) {
    return <Loader />;
  }

  return (
    <>
      {matches
        .sort((match1, match2) => match1.date.getTime() - match2.date.getTime())
        .map((match) => (
          <MatchResult key={match.id} match={match} />
        ))}
    </>
  );
};
