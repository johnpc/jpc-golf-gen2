"use client";
import { Button, Divider, Loader, TextField } from "@aws-amplify/ui-react";
import { ChangeEvent, useState } from "react";
import { buildLeague } from "../helpers/buildLeague";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState<boolean>();
  const [leagueName, setLeagueName] = useState<string>();
  const [startDate, setStartDate] = useState<Date>();
  const [numWeeks, setNumWeeks] = useState<number>();
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const router = useRouter();

  const handleBuildLeague = async () => {
    if (!leagueName || !startDate || !numWeeks || !playerNames.length) {
      alert("Invalid league configuration.");
      return;
    }
    setLoading(true);
    await buildLeague(leagueName, startDate, numWeeks, playerNames);
    setLoading(false);
    router.push("/", { scroll: false });
  };

  const onLeagueNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLeagueName(event.target.value);
  };
  const onPlayerNamesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerNames(event.target.value.split(",").map((name) => name.trim()));
  };
  const onNumWeeksChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumWeeks(parseInt(event.target.value));
  };
  const onStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(event.target.value));
  };

  if (loading) return <Loader />;

  return (
    <>
      <TextField
        descriptiveText="Descriptive name of the league"
        placeholder="A2 Golf Spring 2024"
        label="League Name"
        onChange={onLeagueNameChange}
      />
      <Divider style={{ margin: "15px" }} orientation="horizontal" />

      <TextField
        descriptiveText="Comma separated list of player names"
        placeholder="john,jacob,jingleheimer,schmidt"
        label="Player Names"
        onChange={onPlayerNamesChange}
      />
      <Divider style={{ margin: "15px" }} orientation="horizontal" />
      <TextField
        descriptiveText="Number of weeks the league will run"
        placeholder="4"
        label="Number of Weeks"
        onChange={onNumWeeksChange}
      />
      <Divider style={{ margin: "15px" }} orientation="horizontal" />
      <TextField
        type="date"
        descriptiveText="The date of the first match"
        label="Start date"
        onChange={onStartDateChange}
      />
      <Divider style={{ margin: "15px" }} orientation="horizontal" />
      <Button
        loadingText="loading"
        isLoading={loading}
        onClick={() => handleBuildLeague()}
      >
        Build League!
      </Button>
    </>
  );
}
