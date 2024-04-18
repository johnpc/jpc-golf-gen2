import type { CapacitorConfig } from "@capacitor/cli";
import dotenv from "dotenv";
dotenv.config();

const config: CapacitorConfig = {
  appId: "com.johncorser.golf",
  appName: "jpc.golf",
  webDir: "out",
  bundledWebRuntime: false,
  ios: {
    contentInset: "always",
    backgroundColor: "#B0E0E6",
  },
  android: {
    buildOptions: {
      keystorePath: process.env.ANDROID_KEYSTORE_PATH,
      keystorePassword: process.env.ANDROID_KEYSTORE_PASSWORD,
      keystoreAlias: process.env.ANDROID_KEYSTORE_ALIAS,
      keystoreAliasPassword: process.env.ANDROID_KEYSTORE_ALIAS_PASSWORD,
    },
  },
};

export default config;
