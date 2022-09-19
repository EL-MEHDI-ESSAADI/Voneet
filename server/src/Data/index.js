import dotenv from "dotenv";

dotenv.config();

export const TWO_DAYS = 1000 * 60 * 60 * 24 * 2;

export const TEN_MINUTES = 1000 * 60 * 10;

export const FRONTEND_URL = process.env.FRONTEND_URL;

export const CALLBACK_URL = `${FRONTEND_URL}/callback`;

export const appTokens = {
   appKey: process.env.appKey,
   appSecret: process.env.appSecret,
};

export const langs = {
   ar: "Arabic",
   hy: "Armenian",
   zh: "Chinese",
   da: "Danish",
   en: "English",
   fi: "Finnish",
   fr: "French",
   de: "German",
   hi: "Hindi",
   iw: "Hebrew",
   in: "Indonesian",
   it: "Italian",
   ja: "Japanese",
   kk: "Kazakh",
   ko: "Korean",
   no: "Norwegian",
   pl: "Polish",
   pt: "Portuguese",
   ro: "Romanian",
   ru: "Russian",
   es: "Spanish",
   sv: "Swedish",
   tr: "Turkish",
   uk: "Ukranian",
};
