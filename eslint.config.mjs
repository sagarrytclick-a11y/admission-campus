import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Legacy data/API shapes still use `any` in places; tsc remains the source of truth.
      "@typescript-eslint/no-explicit-any": "off",
      // Apostrophes/quotes in copy — prefer readable JSX text over entity noise.
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
