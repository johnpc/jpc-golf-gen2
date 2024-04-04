import {
  LeagueEntity,
  MatchEntity,
  PlayerEntity,
  ScoreEntity,
  ScoreStub,
} from "./entities";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";
import config from "../../../amplifyconfiguration.json";
import { sleep } from "../helpers/sleep";
Amplify.configure(config);
export class CacheSingleton {
  static instance: CacheSingleton | undefined;
  private client = generateClient<Schema>({
    authMode: "iam",
  });
  private players: PlayerEntity[] = [];
  private matches: MatchEntity[] = [];
  private scores: ScoreEntity[] = [];
  private leagues: LeagueEntity[] = [];

  static async getInstance(): Promise<CacheSingleton> {
    if (!CacheSingleton.instance) {
      CacheSingleton.instance = new CacheSingleton();
      await CacheSingleton.instance.initialize();
    }
    return CacheSingleton.instance;
  }

  private isInitialized = () => {
    return (
      [...this.players, ...this.matches, ...this.scores, ...this.leagues]
        .length > 0
    );
  };

  private _initialize = async () => {
    this.clear();
    const leagueResponse = await this.client.models.League.list({
      selectionSet: [
        "id",
        "name",
        "players.*",
        "scores.*",
        "matches.*",
        "createdAt",
      ],
      limit: 10000,
    });
    const leagueStubs = leagueResponse.data?.map
      ? leagueResponse.data?.map((leagueResponse) => ({
          ...leagueResponse,
          createdAt: new Date(leagueResponse.createdAt),
        }))
      : [];

    const matchResponse = await this.client.models.Match.list({
      selectionSet: ["id", "date", "players.*", "scores.*", "league.*"],
      limit: 10000,
    });

    const matchStubs = matchResponse.data?.map
      ? matchResponse.data?.map((matchResponse) => ({
          ...matchResponse,
          date: new Date(matchResponse.date),
        }))
      : [];
    const playerResponse = await this.client.models.Player.list({
      selectionSet: [
        "id",
        "name",
        "email",
        "matches.*",
        "scores.*",
        "league.*",
      ],
      limit: 10000,
    });
    const playerEntities = playerResponse.data?.map
      ? playerResponse.data.map((playerResponse) => ({
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
          league: leagueStubs.find(
            (leagueStub) => leagueStub.id === playerResponse.league.id,
          )!,
        }))
      : [];

    const scoreResponse = await this.client.models.Score.list({
      selectionSet: ["id", "score", "match.*", "player.*", "league.*"],
      limit: 10000,
    });
    const scoreEntities = scoreResponse.data.map((scoreResponse) => ({
      ...scoreResponse,
      player: scoreResponse.player,
      match: {
        ...scoreResponse.match,
        date: new Date(scoreResponse.match.date),
      },
      league: leagueStubs.find(
        (leagueStub) => leagueStub.id === scoreResponse.league.id,
      )!,
    }));

    const matchEntities = matchResponse.data.map((matchResponse) => ({
      ...matchResponse,
      date: new Date(matchResponse.date),
      players:
        (matchResponse?.players as { playerId: string }[])?.map(
          (playerInfo) =>
            playerEntities.find((player) => player.id === playerInfo.playerId)!,
        ) ?? [],
      league: leagueStubs.find(
        (leagueStub) => leagueStub.id === matchResponse.league.id,
      )!,
    }));

    const leagueEntities = leagueStubs.map((leagueStub) => ({
      ...leagueStub,
      matches: matchStubs.filter(
        (matchStub) => matchStub.league.id === leagueStub.id,
      ),
    }));

    this.players = playerEntities;
    this.scores = scoreEntities;
    this.matches = matchEntities;
    this.leagues = leagueEntities;
  };

  clear = () => {
    this.matches = [];
    this.scores = [];
    this.matches = [];
    this.leagues = [];
  };

  initialize = async (client?: any) => {
    if (client) this.client = client;
    try {
      await this._initialize();
    } catch (error) {
      console.error("Failed to setup cache", error);
      await sleep(1000);
      await this._initialize();
    }
  };

  hydrateLeague = async (id: string): Promise<LeagueEntity> => {
    if (!this.isInitialized()) {
      await this.initialize();
    }
    return this.leagues.find((league) => league.id === id)!;
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

  listLeagues = async (): Promise<LeagueEntity[]> => {
    if (!this.isInitialized()) {
      await this.initialize();
    }
    return this.leagues;
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
