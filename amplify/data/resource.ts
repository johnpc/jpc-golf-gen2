import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Player: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      scores: a.hasMany("Score"),
      matches: a.manyToMany("Match", { relationName: "PlayerMatch" }),
    })
    .authorization([a.allow.public("iam")]),
  Score: a
    .model({
      match: a.belongsTo("Match"),
      player: a.belongsTo("Player"),
      score: a.integer().required(),
    })
    .authorization([a.allow.public("iam")]),
  Match: a
    .model({
      date: a.string().required(),
      players: a.manyToMany("Player", { relationName: "PlayerMatch" }),
      scores: a.hasMany("Score"),
    })
    .authorization([a.allow.public("iam")]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
