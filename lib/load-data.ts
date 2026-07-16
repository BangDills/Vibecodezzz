import dataJson from "@/data.json";
import { loadPortfolio } from "./schema";

/*
 * Single import boundary from the JSON file through Zod validation.
 * - Tree-shakes the parsed object out so it can be statically rendered at SSG
 * - Throws on invalid data at build time => bad data never reaches users
 */
export const portfolio = loadPortfolio(dataJson);
