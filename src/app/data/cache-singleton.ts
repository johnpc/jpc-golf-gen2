import { MatchEntity, PlayerEntity, ScoreEntity, ScoreStub } from "./entities";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";
import config from "../../../amplifyconfiguration.json";
Amplify.configure(config);
const client = generateClient<Schema>({
  authMode: "iam",
});
export class CacheSingleton {
  static instance: CacheSingleton | undefined;
  private players: PlayerEntity[] = [];
  private matches: MatchEntity[] = [];
  private scores: ScoreEntity[] = [];

  static async getInstance(): Promise<CacheSingleton> {
    if (!CacheSingleton.instance) {
      CacheSingleton.instance = new CacheSingleton();
      await CacheSingleton.instance.initialize();
    }
    return CacheSingleton.instance;
  }

  private isInitialized = () => {
    return [...this.players, ...this.matches, ...this.scores].length > 0;
  };

  initialize = async () => {
    const matchResponse = await client.models.Match.list({
      selectionSet: ["id", "date", "players.*", "scores.*"],
      limit: 10000,
    });

    const matchStubs =
      matchResponse.data?.map((matchResponse) => ({
        ...matchResponse,
        date: new Date(matchResponse.date),
      })) ?? [];
    const playerResponse = await client.models.Player.list({
      selectionSet: ["id", "name", "email", "matches.*", "scores.*"],
      limit: 10000,
    });
    const playerEntities = playerResponse.data.map((playerResponse) => ({
      id: playerResponse.id,
      name: playerResponse.name,
      email: playerResponse.email,
      matches:
        matchStubs
          .filter((match) =>
            (match.players as { playerId: string }[]).find(
              (playerInfo) => playerInfo.playerId === playerResponse.id,
            ),
          )
          .map((match) => ({
            ...match,
            date: new Date(match.date),
          })) ?? [],
      scores: playerResponse.scores ?? ([] as ScoreStub[]),
    }));

    const scoreResponse = await client.models.Score.list({
      selectionSet: ["id", "score", "match.*", "player.*"],
      limit: 10000,
    });
    const scoreEntities = scoreResponse.data.map((scoreResponse) => ({
      ...scoreResponse,
      player: scoreResponse.player,
      match: {
        ...scoreResponse.match,
        date: new Date(scoreResponse.match.date),
      },
    }));

    const matchEntities = matchResponse.data.map((matchResponse) => ({
      ...matchResponse,
      date: new Date(matchResponse.date),
      players:
        (matchResponse?.players as { playerId: string }[])?.map(
          (playerInfo) =>
            playerEntities.find((player) => player.id === playerInfo.playerId)!,
        ) ?? [],
    }));

    this.players = playerEntities;
    this.scores = scoreEntities;
    this.matches = matchEntities;
  };

  hydratePlayer = async (id: string): Promise<PlayerEntity> => {
    if (!this.isInitialized()) {
      await this.initialize();
    }
    return this.players.find((player) => player.id === id)!;
  };
  hydrateScore = async (id: string): Promise<ScoreEntity> => {
    if (!this.isInitialized()) {
      await this.initialize();
    }
    return this.scores.find((score) => score.id === id)!;
  };
  hydrateMatch = async (id: string): Promise<MatchEntity> => {
    if (!this.isInitialized()) {
      await this.initialize();
    }
    return this.matches.find((match) => match.id === id)!;
  };

  listPlayers = async (): Promise<PlayerEntity[]> => {
    if (!this.isInitialized()) {
      await this.initialize();
    }
    return this.players;
  };
  listMatches = async (): Promise<MatchEntity[]> => {
    if (!this.isInitialized()) {
      await this.initialize();
    }
    return this.matches;
  };
  listScores = async (): Promise<ScoreEntity[]> => {
    if (!this.isInitialized()) {
      await this.initialize();
    }
    return this.scores;
  };
}
