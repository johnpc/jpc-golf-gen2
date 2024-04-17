import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../amplify/data/resource";
import config from "../amplifyconfiguration.json";
import dotenv from "dotenv";
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

const main = async () => {
  const cacheInstance = await CacheSingleton.getInstance();
  await cacheInstance.initialize(client);
  const leagues = await listLeagues();
  await cleanUp(leagues);
};
main();
