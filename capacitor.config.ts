import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.johncorser.golf",
  appName: "jpc.golf",
  webDir: "out",
  bundledWebRuntime: false,
  ios: {
    contentInset: "always",
    backgroundColor: "#B0E0E6",
  },
};

export default config;
