import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../amplify/data/resource";
import config from "../amplifyconfiguration.json";
import dotenv from "dotenv";
import { buildLeague } from "@/app/helpers/buildLeague";
import { CacheSingleton } from "@/app/data/cache-singleton";
import { LeagueEntity, listLeagues } from "@/app/data/entities";
import { cleanUpLeague } from "@/app/helpers/cleanUpLeague";
dotenv.config();

Amplify.configure(config);
const client = generateClient<Schema>({
  authMode: "lambda",
  authToken: process.env.ADMIN_API_KEY!,
});

const cleanUp = async (leagues: LeagueEntity[]) => {
  const promises = leagues.map((league) => cleanUpLeague(league));
  await Promise.all(promises);
};

const main = async (playerNames: string[]) => {
  const cacheInstance = await CacheSingleton.getInstance();
  await cacheInstance.initialize(client);
  const leagues = await listLeagues();
  await cleanUp(leagues);
  const numLeaguesToCreate = 2;
  const numWeeksPerLeague = 4;
  const promises = Array.from(Array(numLeaguesToCreate)).map(
    async (_, leagueNumber) => {
      return await buildLeague(
        `Test League ${leagueNumber}`,
        new Date(),
        numWeeksPerLeague,
        playerNames,
      );
    },
  );
  await Promise.all(promises);
};
const playerNames = [
  "Emily", // The Purple Jacket
  "Yeon", // Yoink
  "John", // Chef boy-r-d
  "James", // Cpt Insano
  "Josh", // Sir Mix A Lot - Eight Iron
  "Jamas", // Mas
  "Kody", // Xyllor
  "Nobody", // Free Win
];

main(playerNames);
