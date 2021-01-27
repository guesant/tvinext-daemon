import bodyParser from "body-parser";
import config from "config";
import cors from "cors";
import errorHandler from "errorhandler";
import { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { router } from "./routing/Router";

export const setupServer = (app: Express) => {
  app.use(helmet());
  app.use(cors());
  app.use(morgan("common"));
  config.get("debug") && app.use(errorHandler());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

export const setupRoutes = (app: Express) => {
  app.use(router);
};

export const setupFallback = (app: Express) => {
  app.use((_, res) => {
    res.status(404).send();
  });
};

export const setupApp = (app: Express) => {
  setupServer(app);
  setupRoutes(app);
  setupFallback(app);
};
