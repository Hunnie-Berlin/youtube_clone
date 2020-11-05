import passport from "passport";
import GithubStrategy from "passport-github2";
import { githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import dotenv from "dotenv";
dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? "https://hidden-bayou-14330.herokuapp.com/auth/github/callback"
        : "http://localhost:4000/auth/github/callback",
      scope: ["user:email"],
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
