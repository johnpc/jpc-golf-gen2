import { defineBackend, defineFunction } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { Function } from "aws-cdk-lib/aws-lambda";
import dotenv from "dotenv";
dotenv.config();
const authFunction = defineFunction({
  entry: "./data/custom-authorizer.ts",
});

const backend = defineBackend({
  auth,
  authFunction,
  data: data(authFunction),
});

const underlyingAuthLambda = backend.authFunction.resources.lambda as Function;
underlyingAuthLambda.addEnvironment(
  "ADMIN_API_KEY",
  process.env.ADMIN_API_KEY!,
);
