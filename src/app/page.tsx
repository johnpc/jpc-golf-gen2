"use client";
import { Loader, Tabs } from "@aws-amplify/ui-react";
import { Leaderboard } from "./components/leaderboard";
import { Results } from "./components/results";
import { Matches } from "./components/matches";
import { ReportScore } from "./components/report-score";
import { useEffect, useState } from "react";
import { listPlayers } from "./data/entities";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const setup = async () => {
      await listPlayers();
      setLoading(false);
    };
    setup();
  });
  if (loading) return <Loader />;

  return (
    <>
      <ReportScore />
      <Tabs
        justifyContent="center"
        defaultValue="leaderboard"
        items={[
          {
            label: "Leaderboard",
            value: "leaderboard",
            content: <Leaderboard />,
          },
          {
            label: "Matches",
            value: "matches",
            content: <Matches />,
          },
          { label: "Results", value: "results", content: <Results /> },
        ]}
      />
    </>
  );
}
