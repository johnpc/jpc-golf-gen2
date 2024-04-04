import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";
import config from "../../../amplifyconfiguration.json";
import { CacheSingleton } from "./cache-singleton";
import { Subscription } from "rxjs";
Amplify.configure(config);
const client = generateClient<Schema>({
  authMode: "iam",
});

export type LeagueStub = {
  id: string;
  name: string;
  createdAt: Date;
};

export type PlayerStub = {
  id: string;
  name: string;
  email: string;
};

export type ScoreStub = {
  id: string;
  score: number;
};

export type MatchStub = {
  id: string;
  date: Date;
};

export type LeagueEntity = LeagueStub & {
  scores: ScoreStub[];
  matches: MatchStub[];
  players: PlayerStub[];
};

export type PlayerEntity = PlayerStub & {
  scores: ScoreStub[];
  matches: MatchStub[];
  league: LeagueStub;
};

export type ScoreEntity = ScoreStub & {
  match: MatchStub;
  player: PlayerStub;
  league: LeagueStub;
};

export type MatchEntity = MatchStub & {
  players: PlayerStub[];
  scores: ScoreStub[];
  league: LeagueStub;
};

export const hydrateLeague = async (id: string): Promise<LeagueEntity> => {
  const cacheInstance = await CacheSingleton.getInstance();
  return cacheInstance.hydrateLeague(id);
};

export const hydratePlayer = async (id: string): Promise<PlayerEntity> => {
  const cacheInstance = await CacheSingleton.getInstance();
  return cacheInstance.hydratePlayer(id);
};

export const hydrateScore = async (id: string): Promise<ScoreEntity> => {
  const cacheInstance = await CacheSingleton.getInstance();
  return cacheInstance.hydrateScore(id);
};

export const hydrateMatch = async (id: string): Promise<MatchEntity> => {
  const cacheInstance = await CacheSingleton.getInstance();
  return cacheInstance.hydrateMatch(id);
};

export const listLeagues = async () => {
  const cacheInstance = await CacheSingleton.getInstance();
  return cacheInstance.listLeagues();
};

export const listPlayers = async (league: LeagueEntity) => {
  const cacheInstance = await CacheSingleton.getInstance();
  const fetchedPlayers = await cacheInstance.listPlayers();
  return fetchedPlayers.filter((player) => player.league.id === league.id);
};

export const listMatches = async (league: LeagueEntity) => {
  const cacheInstance = await CacheSingleton.getInstance();
  const fetchedMatches = await cacheInstance.listMatches();
  return fetchedMatches.filter((match) => match.league.id === league.id);
};

export const listScores = async (league: LeagueEntity) => {
  const cacheInstance = await CacheSingleton.getInstance();
  const fetchedScores = await cacheInstance.listScores();
  return fetchedScores.filter((score) => score.league.id === league.id);
};

export const scoreListener = (fn: () => void) => {
  const listener = client.models.Score.onCreate().subscribe({
    next: async () => {
      const cacheInstance = await CacheSingleton.getInstance();
      await cacheInstance.initialize();
      fn();
    },
    error: (error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const unsubscribeListener = (subscription: Subscription) => {
  return subscription.unsubscribe();
};

export const createPlayer = async (playerProps: {
  league: LeagueEntity;
  name: string;
  email: string;
}) => {
  const createdPlayer = await client.models.Player.create({
    ...playerProps,
    league: undefined,
    leaguePlayersId: playerProps.league.id,
  });
  return await hydratePlayer(createdPlayer.data.id);
};

export const createScore = async (
  league: LeagueEntity,
  match: MatchEntity,
  player: PlayerEntity,
  score: number,
) => {
  const createdScore = await client.models.Score.create({
    score,
    playerScoresId: player.id,
    matchScoresId: match.id,
    leagueScoresId: league.id,
  });
  return await hydrateScore(createdScore.data.id);
};
