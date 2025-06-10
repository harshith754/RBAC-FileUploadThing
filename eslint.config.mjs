import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "src/app/generated/prisma/**/*.js",
      "src/app/generated/prisma/**/*.d.ts",
      "src/app/generated/prisma/runtime/**/*.js",
      "src/app/generated/prisma/runtime/**/*.d.ts",
    ],
  },
];

export default eslintConfig;
