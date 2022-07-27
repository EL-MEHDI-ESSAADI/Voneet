import { TwitterApi } from "twitter-api-v2";
import { appTokens } from "../Data";

const appOnlyClient = new TwitterApi(appTokens);

export default appOnlyClient;
