import {
  Loader,
  ThemeProvider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import {
  LeagueEntity,
  MatchEntity,
  listMatches,
  scoreListener,
  unsubscribeListener,
} from "../data/entities";
import { tableTheme } from "../theme/tableTheme";
import { getDateColor } from "../helpers/getDateColor";
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const Matches = (props: { league: LeagueEntity }) => {
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
    <ThemeProvider theme={tableTheme} colorMode="light">
      <Table highlightOnHover variation="striped">
        <TableHead>
          <TableRow>
            <TableCell as="th">Date</TableCell>
            <TableCell as="th">Player</TableCell>
            <TableCell as="th">Vs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches
            .sort(
              (match1, match2) => match1.date.getTime() - match2.date.getTime(),
            )
            .filter(
              (match: MatchEntity) =>
                match.date.getTime() >= new Date().getTime() - MS_PER_DAY,
            )
            .map((match: MatchEntity) => (
              <TableRow key={match.id}>
                <TableCell color={getDateColor(match.date)}>
                  {match.date.toLocaleDateString()}
                </TableCell>
                <TableCell color={getDateColor(match.date)}>
                  {match.players[0].name}
                </TableCell>
                <TableCell color={getDateColor(match.date)}>
                  {match.players[1].name}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
};
