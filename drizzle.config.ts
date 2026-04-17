import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL_NON_POOLING || env.POSTGRES_URL,
  },
  tablesFilter: ["TIC_*"],
} satisfies Config;
