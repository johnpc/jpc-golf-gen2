import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import { MatchEntity } from "../data/entities";
import { Handicap } from "./score-views/handicap";
import { Tbd } from "./tbd";
import { tableTheme } from "../theme/tableTheme";
import { RawScore } from "./score-views/raw-score";
import { AdjustedScore } from "./score-views/adjusted-score";
import { Result } from "./score-views/result";

export const MatchResult = (props: { match: MatchEntity }) => {
  return (
    <Card>
      <ThemeProvider theme={tableTheme} colorMode="light">
        {props.match.scores.length ? (
          <>
            <Table
              highlightOnHover
              variation="striped"
              caption={`Match on ${props.match.date.toLocaleDateString()}`}
            >
              <TableHead>
                <TableRow>
                  <TableCell as="th" />
                  <TableCell as="th">{props.match.players[0].name}</TableCell>
                  <TableCell as="th">{props.match.players[1].name}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell as="th">Handicap</TableCell>
                  <TableCell>
                    <Handicap
                      player={props.match.players[0]}
                      date={props.match.date}
                    />
                  </TableCell>
                  <TableCell>
                    <Handicap
                      player={props.match.players[1]}
                      date={props.match.date}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell as="th">Raw Score</TableCell>
                  <TableCell>
                    <RawScore
                      player={props.match.players[0]}
                      match={props.match}
                    />
                  </TableCell>
                  <TableCell>
                    <RawScore
                      player={props.match.players[1]}
                      match={props.match}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell as="th">Adj Score</TableCell>
                  <TableCell>
                    <AdjustedScore
                      player={props.match.players[0]}
                      match={props.match}
                    />
                  </TableCell>
                  <TableCell>
                    <AdjustedScore
                      player={props.match.players[1]}
                      match={props.match}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell as="th">Winner</TableCell>
                  <TableCell>
                    <Result
                      player={props.match.players[0]}
                      match={props.match}
                    />
                  </TableCell>
                  <TableCell>
                    <Result
                      player={props.match.players[1]}
                      match={props.match}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        ) : (
          <Tbd match={props.match} />
        )}
      </ThemeProvider>
    </Card>
  );
};
