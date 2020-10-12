import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  getJoin,
  getLogin,
  githubLogin,
  logout,
  postGithubLogin,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(routes.githubCallback, passport.authenticate("github", { failureRedirect: "/login" }),
postGithubLogin);

globalRouter.get(routes.logout, logout);

export default globalRouter;
