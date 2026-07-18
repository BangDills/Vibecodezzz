// Next.js 16 removed `next lint`. Projects must run the ESLint CLI directly.
// eslint-config-next@16 ships native flat-config exports, so we import them
// directly instead of going through @eslint/eslintrc FlatCompat (which crashes
// on ESLint 9.39 with "Converting circular structure to JSON").
import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
