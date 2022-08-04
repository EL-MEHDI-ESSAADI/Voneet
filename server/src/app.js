import express from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter, welcomeMessagesRouter } from "./Routes/index.js";
import { TWO_DAYS, FRONTEND_URL } from "./Data/index.js";
import { ApiRequestError, ApiResponseError, TwitterApi } from "twitter-api-v2";
import { asyncWrapper } from "./Helpers/utils.js";

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();

// Configure session - needed to store access token and secret
app.use(
   session({
      secret: process.env.sessionSecret,
      store: MongoStore.create({
         mongoUrl: process.env.dbString,
         dbName: process.env.dbName,
      }),
      resave: true,
      rolling: true,
      saveUninitialized: false, // don't save uninitialized session
      cookie: {
         secure: process.env.NODE_ENV == "production" ? true : false,
         maxAge: TWO_DAYS,
      },
      proxy: true,
   })
);

/*
   - session  will update (expires) on every requist to the server (default behaviour)
   - cookie  will update (maxage) on every requist to the serve (achieved by rolling: true, resave: true)
   - in every request there is read from the mongodb because express-session read tha data and put in on req.session (default behaviour)
   - in every request there is write (update) to the mongodb because express-session will update the expires date on the store (default behaviour)
   - if the user was inactive for two days, session will expire
*/

// for parse body that you get from client
app.use(express.urlencoded({ extended: true }));

// for parse json that you get from client
app.use(express.json());

// configure cors and header
app.use(
   cors({
      origin: FRONTEND_URL,
      optionsSuccessStatus: 200,
      credentials: true,
   })
);
app.use(function (req, res, next) {
   res.header("Content-Type", "application/json;charset=UTF-8");
   res.header("Access-Control-Allow-Credentials", true);
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Routes
app.use("/auth", authRouter);
app.use("/welcomeMessages", welcomeMessagesRouter);

app.get("/", (req, res) => {
   res.json({ message: "response for / path" });
});

// Error handler
app.use((err, req, res, next) => {
   console.error(err);

   // ratelimit error
   if (err.rateLimitError) {
      res.status(429).json(err.rateLimit);
      return;
   }
   // user tokens error
   if (err.isAuthError && err.errors[0].code === 89) {
      res.status(401).json({ message: "you denied the application access, please logout and login again" });
      return;
   }

   // server error
   res.status(500).json({ message: "something went wrong in the server" });
});

// Start server
app.listen(PORT, () => console.log(`Serve running on port ${PORT}`));
