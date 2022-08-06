import { TwitterApi } from "twitter-api-v2";
import { appTokens } from "../Data/index.js";
import dotenv from "dotenv"

dotenv.config();

const appOnlyClient = new TwitterApi(appTokens);

export const appOnlyClientAuth2 = new TwitterApi(process.env.appBearerToken);



export default appOnlyClient;
