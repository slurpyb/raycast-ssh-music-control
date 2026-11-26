import raycastConfig from "@raycast/eslint-config";
import typefest from "eslint-plugin-typefest";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(globalIgnores(["raycast-env.d.ts"]), raycastConfig, typefest.configs.recommended);
