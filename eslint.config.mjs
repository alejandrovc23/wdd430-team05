import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const compatibility = new FlatCompat({ baseDirectory: currentDirectory });

export default defineConfig([
  ...compatibility.extends("next/core-web-vitals"),
  globalIgnores([".next/**", "out/**", "build/**"]),
]);
