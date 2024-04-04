"use client";
import { Loader, Tabs } from "@aws-amplify/ui-react";
import { Leaderboard } from "./components/leaderboard";
import { Results } from "./components/results";
import { Matches } from "./components/matches";
import { ReportScore } from "./components/report-score";
import { useEffect, useState } from "react";
import { listPlayers, listLeagues, LeagueEntity } from "./data/entities";

export default function Home() {
  const [league, setLeague] = useState<LeagueEntity>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const setup = async () => {
      const leagues = await listLeagues();
      const sortedLeagues = leagues.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
      setLeague(sortedLeagues[0]);
      await listPlayers();
      setLoading(false);
    };
    setup();
  });
  if (!league || loading) return <Loader />;

  return (
    <>
      <ReportScore league={league} />
      <Tabs
        justifyContent="center"
        defaultValue="leaderboard"
        items={[
          {
            label: "Leaderboard",
            value: "leaderboard",
            content: <Leaderboard league={league} />,
          },
          {
            label: "Matches",
            value: "matches",
            content: <Matches league={league} />,
          },
          {
            label: "Results",
            value: "results",
            content: <Results league={league} />,
          },
        ]}
      />
    </>
  );
}
