/// <reference types="node" />
// @ts-check
import { realpathSync } from "node:fs";

import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

const workspacePath = realpathSync(process.cwd());
const isWslMountedWorkspace =
  process.platform === "linux" &&
  Boolean(process.env.WSL_DISTRO_NAME) &&
  workspacePath.startsWith("/mnt/");

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    server: {
      watch: isWslMountedWorkspace
        ? {
            usePolling: true,
            interval: 120,
          }
        : undefined,
    },
  },
});
