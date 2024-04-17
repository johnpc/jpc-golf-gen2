"use client";
import { useRouter } from "next/navigation";
import { Loader, SelectField } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { listLeagues, LeagueEntity } from "./data/entities";
import League from "./components/league";

export default function Home() {
  const [leagues, setLeagues] = useState<LeagueEntity[]>([]);
  const [league, setLeague] = useState<LeagueEntity>();
  const router = useRouter();

  useEffect(() => {
    const setup = async () => {
      const leagues = await listLeagues();
      const sortedLeagues = leagues.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
      setLeague(sortedLeagues[0]);
      setLeagues(sortedLeagues);
    };
    setup();
  }, []);

  const onLeagueSelect = (leagueId: string) => {
    if (leagueId === "create") {
      router.push("/create-league", { scroll: false });
      return;
    }
    const selectedLeague = leagues.find((league) => league.id === leagueId);
    console.log({ selectedLeague });

    setLeague(selectedLeague);
  };

  if (!leagues.length || !league) return <Loader variation="linear" />;

  return (
    <>
      <SelectField
        label="Other leagues"
        descriptiveText="Create a new league or review other leagues"
        onChange={(e) => onLeagueSelect(e.target.value)}
      >
        {leagues.map((league) => (
          <option key={league.id} value={league.id}>
            {league.name}
          </option>
        ))}
        <option value={"create"}>Create a league</option>
      </SelectField>
      <League league={league} />
    </>
  );
}
