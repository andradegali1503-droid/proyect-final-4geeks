import { build } from "vite";
import configVite from "../vite.config.mjs";

await build({
  ...configVite,
  configFile: false
});
