import dotenv from "dotenv";

dotenv.config();

export const TWO_DAYS = 1000 * 60 * 60 * 24 * 2;

export const TEN_MINUTES = 1000 * 60 * 10;

export const frontEndSiteUrl = process.env.frontEndSiteUrl;


export const CALLBCK_URL = `${frontEndSiteUrl}/callback`;

export const appTokens = {
   appKey: process.env.appKey,
   appSecret: process.env.appSecret,
};
