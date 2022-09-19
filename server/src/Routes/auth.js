import express from "express";
import { TwitterApi } from "twitter-api-v2";
import { appTokens, CALLBACK_URL, TEN_MINUTES, TWO_DAYS } from "../Data/index.js";
import { asyncWrapper } from "../Helpers/utils.js";
import { appOnlyClient } from "../Modules/index.js";

const router = express.Router();

// route for send auth link to the client
router.get(
   "/",
   asyncWrapper(async (req, res) => {
      const authInfo = await appOnlyClient.generateAuthLink(CALLBACK_URL);

      // set temp tokens to the user
      req.session.tempUserTokens = {
         accessToken: authInfo.oauth_token,
         accessSecret: authInfo.oauth_token_secret,
      };
      req.session.cookie.maxAge = TEN_MINUTES;

      res.json({ authUrl: authInfo.url });
   })
);

// route for read data from Twitter callback, and authenticate the client
router.post(
   "/callback",
   asyncWrapper(async (req, res) => {
      // invalid request
      if (!req.body.oauth_token || !req.body.oauth_verifier)
         return res.status(400).json({ message: "you didn't allow the application access" });

      const queriedAccessToken = req.body.oauth_token;
      const verifier = req.body.oauth_verifier;
      const savedAccessToken = req.session.tempUserTokens ? req.session.tempUserTokens.accessToken : undefined;
      const savedAccessSecret = req.session.tempUserTokens ? req.session.tempUserTokens.accessSecret : undefined;

      // invalid savedAccessToken or savedAccessSecret
      if (!savedAccessToken || !savedAccessSecret || queriedAccessToken !== savedAccessToken)
         return res.status(400).json({
            message: "your request may have expire. Please renew the auth process.",
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
   })
);

// route for check if client loggedin
router.get(
   "/check",
   asyncWrapper(async (req, res) => {
      const { userTokens } = req.session;

      // if userTokens is undefined, the user isn't loggedin
      if (!userTokens) return res.json({ isUserLoggedin: false, twitterAccountInfo: null });

      const client = new TwitterApi({
         ...appTokens,
         ...userTokens,
      });

      const userInfo = await client.v2.me({ "user.fields": ["profile_image_url"] });
      res.json({ isUserLoggedin: true, twitterAccountInfo: userInfo.data });
   })
);

// route for logout the client
router.delete("/logout", (req, res) => {
   req.session.destroy((error) => {
      if (error) {
         res.status(400).json({ error });
      } else {
         res.json({ message: "logout successful" });
      }
   });
});

export default router;
