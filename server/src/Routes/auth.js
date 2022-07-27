import express from "express";
import { TwitterApi } from "twitter-api-v2";
import { appTokens, TWO_DAYS } from "../Data";
import { appOnlyClient } from "../Modules";

const CALLBCK_URL = "http://localhost:3000/callback";
const TEN_MINUTES = 1000 * 60 * 10;
const router = express.Router();

// route for send auth link to the client
router.get("/", async (req, res) => {
   const authInfo = await appOnlyClient.generateAuthLink(CALLBCK_URL);

   // set temp tokens to the user
   req.session.tempUserTokens = { accessToken: authInfo.oauth_token, accessSecret: authInfo.oauth_token_secret };
   req.session.cookie.maxAge = TEN_MINUTES;

   res.json({ authUrl: authInfo.url });
});

// route for read data from Twitter callback, and authenticate the client
router.get("/callback", async (req, res) => {
   // invalid request
   if (!req.query.oauth_token || !req.query.oauth_verifier)
      return res.status(400).json({ error: "Bad request, or user denied application access" });

   const queriedAccessToken = req.query.oauth_token;
   const verifier = req.query.oauth_verifier;
   const savedAccessToken = req.session.tempUserTokens.accessToken;
   const savedAccessSecret = req.session.tempUserTokens.accessSecret;

   // invalid savedAccessToken or savedAccessSecret
   if (!savedAccessToken || !savedAccessSecret || queriedAccessToken !== savedAccessToken)
      return res.status(400).json({
         error: "OAuth token is not known or invalid. Your request may have expire. Please renew the auth process.",
      });

   // build temp client
   const tempClient = new TwitterApi({
      ...appTokens,
      accessToken: savedAccessToken,
      accessSecret: savedAccessSecret,
   });

   // login the tempclient with verifier, to have the access to his account
   const { client: loggedClient, accessToken, accessSecret } = await tempClient.login(verifier);

   // delete the tempUserTokens from, store and update maxAge
   delete req.session.tempUserTokens;
   req.session.cookie.maxAge = TWO_DAYS;

   // store accessToken, accessSecret
   req.session.userTokens = {
      accessToken,
      accessSecret,
   };

   const userInfo = await loggedClient.v2.me({ "user.fields": ["profile_image_url"] });

   res.json(userInfo.data);
});

// route for check if client loggedin
router.get("/check", async (req, res) => {
   const { userTokens } = req.session;

   // if userTokens is undefined, the user isn't loggedin
   if (!userTokens) return res.status(400).json({ isUserLoggedin: false });

   const client = new TwitterApi({
      ...appTokens,
      ...userTokens,
   });

   const userInfo = await client.v2.me({ "user.fields": ["profile_image_url"] });
   res.json(userInfo.data);
});

// route for logout the client
router.get("/logout", (req, res) => {
   req.session.destroy((error) => {
      if (error) {
         res.status(400).json({ error });
      } else {
         res.json({ message: "logout successful" });
      }
   });
});

export default router;
