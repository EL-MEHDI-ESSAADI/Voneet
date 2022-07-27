import dotenv from "dotenv";

dotenv.config();

export const TWO_DAYS = 1000 * 60 * 60 * 24 * 2;

export const appTokens = {
   appKey: process.env.appKey,
   appSecret: process.env.appSecret,
};