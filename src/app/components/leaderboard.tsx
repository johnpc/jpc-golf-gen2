import {
  Loader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import {
  LeagueEntity,
  PlayerEntity,
  listPlayers,
  scoreListener,
  unsubscribeListener,
} from "../data/entities";
import { Handicap } from "./score-views/handicap";
import { tableTheme } from "../theme/tableTheme";
import getLeaguePoints from "../helpers/getLeaguePoints";

type PlayerWithPoints = PlayerEntity & {
  leaguePoints: number;
};

export const Leaderboard = (props: { league: LeagueEntity }) => {
  const [players, setPlayers] = useState<PlayerWithPoints[]>([]);
  useEffect(() => {
    const setup = async () => {
      const fetchedPlayers = await listPlayers();
      const playerWithPointsPromises = fetchedPlayers
        .filter((player) => player.league.id === props.league.id)
        .map(async (player) => ({
          ...player,
          leaguePoints: await getLeaguePoints(player),
        }));
      const playersWithPoints = await Promise.all(playerWithPointsPromises);
      playersWithPoints.sort(
        (playerOne, playerTwo) =>
          playerTwo.leaguePoints - playerOne.leaguePoints,
      );
      setPlayers(playersWithPoints);
      const listener = scoreListener(async () => {
        await setup();
      });
      return () => {
        unsubscribeListener(listener);
      };
    };
    setup();
  }, []);
  if (players.length === 0) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={tableTheme} colorMode="light">
      <Table highlightOnHover variation="striped">
        <TableHead>
          <TableRow>
            <TableCell as="th">Player Name</TableCell>
            <TableCell as="th">Handicap</TableCell>
            <TableCell as="th">League Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player: PlayerWithPoints) => (
            <TableRow key={player.id}>
              <TableCell>{player.name}</TableCell>
              <TableCell>
                <Handicap player={player} />
              </TableCell>
              <TableCell>{player.leaguePoints}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
};
