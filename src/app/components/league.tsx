"use client";
import { Loader, Tabs } from "@aws-amplify/ui-react";
import { Leaderboard } from "./leaderboard";
import { Results } from "./results";
import { Matches } from "./matches";
import { ReportScore } from "./report-score";
import { useEffect, useState } from "react";
import { listPlayers, LeagueEntity } from "../data/entities";

export default function League(props: { league: LeagueEntity }) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const setup = async () => {
      await listPlayers(props.league);
      setLoading(false);
    };
    setup();
  });
  if (loading) return <Loader />;

  return (
    <>
      <ReportScore league={props.league} />
      <Tabs
        justifyContent="center"
        defaultValue="leaderboard"
        items={[
          {
            label: "Leaderboard",
            value: "leaderboard",
            content: <Leaderboard league={props.league} />,
          },
          {
            label: "Matches",
            value: "matches",
            content: <Matches league={props.league} />,
          },
          {
            label: "Results",
            value: "results",
            content: <Results league={props.league} />,
          },
        ]}
      />
    </>
  );
}
