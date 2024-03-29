import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { AmplifyFunction, ConstructFactory } from "@aws-amplify/plugin-types";

const schema = a.schema({
  Player: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      scores: a.hasMany("Score"),
      matches: a.manyToMany("Match", { relationName: "PlayerMatch" }),
    })
    .authorization([a.allow.custom(), a.allow.public("iam").to(["read"])]),
  Score: a
    .model({
      match: a.belongsTo("Match"),
      player: a.belongsTo("Player"),
      score: a.integer().required(),
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
    })
    .authorization([a.allow.custom(), a.allow.public("iam").to(["read"])]),
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
