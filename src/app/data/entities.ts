import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";
import config from "../../../amplifyconfiguration.json";
import { CacheSingleton } from "./cache-singleton";
import { Subscription } from "rxjs";
import { sleep } from "../helpers/sleep";
Amplify.configure(config);
const client = generateClient<Schema>({
  authMode: "iam",
});

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

export type PlayerEntity = PlayerStub & {
  scores: ScoreStub[];
  matches: MatchStub[];
};

export type ScoreEntity = ScoreStub & {
  match: MatchStub;
  player: PlayerStub;
};

export type MatchEntity = MatchStub & {
  players: PlayerStub[];
  scores: ScoreStub[];
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

export const listPlayers = async () => {
  const cacheInstance = await CacheSingleton.getInstance();
  return cacheInstance.listPlayers();
};

export const listMatches = async () => {
  const cacheInstance = await CacheSingleton.getInstance();
  return cacheInstance.listMatches();
};

export const listScores = async () => {
  const cacheInstance = await CacheSingleton.getInstance();
  return cacheInstance.listScores();
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
  name: string;
  email: string;
}) => {
  const createdPlayer = await client.models.Player.create(playerProps);
  return await hydratePlayer(createdPlayer.data.id);
};

export const createScore = async (
  match: MatchEntity,
  player: PlayerEntity,
  score: number,
) => {
  const createdScore = await client.models.Score.create({
    score,
    playerScoresId: player.id,
    matchScoresId: match.id,
  });
  return await hydrateScore(createdScore.data.id);
};
