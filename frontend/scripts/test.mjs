import { createVitest } from "vitest/node";
import configVite from "../vite.config.mjs";

const vitest = await createVitest(
  "test",
  {
    root: process.cwd(),
    config: false
  },
  configVite,
  {
    run: true,
    watch: false
  }
);

await vitest.start([]);
await vitest.close();
