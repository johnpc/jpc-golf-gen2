"use client";
import {
  useTheme,
  Button,
  Message,
  SelectField,
  Input,
  Fieldset,
  Loader,
} from "@aws-amplify/ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import {
  LeagueEntity,
  MatchEntity,
  PlayerEntity,
  ScoreEntity,
  createScore,
  hydrateMatch,
  hydratePlayer,
  listMatches,
  listPlayers,
  listScores,
} from "../data/entities";
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_PER_WEEK = MS_PER_DAY * 7;

export const ReportScore = (props: { league: LeagueEntity }) => {
  const { tokens } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [players, setPlayers] = useState<PlayerEntity[]>([]);
  const [matches, setMatches] = useState<MatchEntity[]>([]);
  const [scores, setScores] = useState<ScoreEntity[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerEntity>();
  const [selectedMatch, setSelectedMatch] = useState<MatchEntity>();
  const [score, setScore] = useState<number>();
  const hasScore = !!score || score === 0;

  const setup = async () => {
    const p = await listPlayers();
    setPlayers(p);
    const m = await listMatches();
    setMatches(m);
    const s = await listScores();
    setScores(s);
  };

  useEffect(() => {
    setup();
  }, []);

  const onChangeScore = async (event: ChangeEvent<HTMLInputElement>) => {
    const score = parseInt(event.target.value);
    setScore(score);
  };

  const onSelectPlayer = async (event: ChangeEvent<HTMLSelectElement>) => {
    const playerId = event.target.value;
    const player = await hydratePlayer(playerId);
    setSelectedPlayer(player);
  };

  const onSelectMatch = async (event: ChangeEvent<HTMLSelectElement>) => {
    const matchId = event.target.value;
    const match = await hydrateMatch(matchId);
    setSelectedMatch(match);
  };

  const handleReportScoreClick = async () => {
    setSuccess(false);
    setError(false);
    setIsLoading(true);

    if (!hasScore || !selectedMatch || !selectedPlayer) {
      setError(true);
      setIsLoading(false);
      return;
    }

    await createScore(props.league, selectedMatch, selectedPlayer, score);
    setSelectedPlayer(undefined);
    setSelectedMatch(undefined);
    setScore(undefined);
    setSuccess(true);
    setup();
    setIsLoading(false);
  };
  if (players.length === 0 || matches.length === 0) return <Loader />;

  return (
    <>
      {success ? (
        <Message variation="outlined" colorTheme="success" heading="Success">
          Score reported
        </Message>
      ) : (
        ""
      )}
      {error ? (
        <Message variation="outlined" colorTheme="error" heading="Error">
          Failed to report score.
        </Message>
      ) : (
        ""
      )}
      <Fieldset legend="Report a score" variation="outlined" direction="column">
        <SelectField
          onChange={onSelectPlayer}
          marginBottom={tokens.space.medium}
          label="Players"
          size="large"
          descriptiveText="Which player?"
          labelHidden={true}
        >
          <option value="">Select Player</option>
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </SelectField>

        <SelectField
          onChange={onSelectMatch}
          marginBottom={tokens.space.medium}
          label="Matches"
          size="large"
          descriptiveText="Select Match"
          labelHidden={true}
          disabled={!!!selectedPlayer}
        >
          <option value="apple">Select Match</option>
          {matches
            .filter((match) =>
              match.players.find((player) => selectedPlayer?.id === player.id),
            )

            .filter((match) => {
              // Only display last week's and next week's match
              return (
                // if the date is more than a week ago
                // Date.parse(match.date) > Date.now() - MS_PER_WEEK &&
                // or if the date is less than a week from now
                match.date.getTime() < Date.now() + MS_PER_WEEK
              );
            })
            .filter((match) => {
              // Hide dates where the score was already reported
              const matchScore = scores.find(
                (score) =>
                  score.match.id === match.id &&
                  score.player.id === selectedPlayer?.id,
              );
              return !matchScore;
            })
            .sort((match1, match2) => {
              return match1.date.getTime() - match2.date.getTime();
            })
            .map((match) => (
              <option key={match.id} value={match.id}>
                {match.date.toLocaleDateString()}
              </option>
            ))}
        </SelectField>

        <Input
          onChange={onChangeScore}
          disabled={!!!selectedMatch}
          size="large"
          placeholder="Score over/under par"
          marginBottom={tokens.space.medium}
          id="score"
        />

        <Button
          disabled={!hasScore}
          isFullWidth={true}
          isLoading={isLoading}
          colorTheme="overlay"
          size="large"
          onClick={() => handleReportScoreClick()}
        >
          Report Score
        </Button>
      </Fieldset>
    </>
  );
};
