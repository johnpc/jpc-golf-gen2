import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { AmplifyFunction, ConstructFactory } from "@aws-amplify/plugin-types";

const schema = a.schema({
  League: a
    .model({
      name: a.string().required(),
      players: a.hasMany("Player"),
      scores: a.hasMany("Score"),
      matches: a.hasMany("Match"),
    })
    .authorization([
      a.allow.custom(),
      a.allow.public("iam").to(["read", "create"]),
    ]),
  Player: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      scores: a.hasMany("Score"),
      initialHandicap: a.integer(),
      matches: a.manyToMany("Match", { relationName: "PlayerMatch" }),
      league: a.belongsTo("League"),
    })
    .secondaryIndexes((index) => [index("email")])
    .authorization([
      a.allow.custom(),
      a.allow.public("iam").to(["read", "create"]),
    ]),
  Score: a
    .model({
      match: a.belongsTo("Match"),
      player: a.belongsTo("Player"),
      score: a.integer().required(),
      league: a.belongsTo("League"),
    })
    .authorization([
      a.allow.custom(),
      a.allow.public("iam").to(["read", "create"]),
    ]),
  Match: a
    .model({
      date: a.string().required(),
      players: a.manyToMany("Player", { relationName: "PlayerMatch" }),
      scores: a.hasMany("Score"),
      league: a.belongsTo("League"),
    })
    .authorization([
      a.allow.custom(),
      a.allow.public("iam").to(["read", "create"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = (authFunction: ConstructFactory<AmplifyFunction>) =>
  defineData({
    schema,
    authorizationModes: {
      defaultAuthorizationMode: "iam",
      lambdaAuthorizationMode: {
        function: authFunction,
        timeToLiveInSeconds: 300,
      },
    },
  });
