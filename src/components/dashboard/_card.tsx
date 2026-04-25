// Production Schema — The Incite Crew
import { index, pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `TIC_${name}`);
