import express, { Application, Request, Response } from "express";
import session from "express-session";
// import pinoHttp from "pino-http";
// import logger from "./common/logger/logger";
import { askUsController, authController } from "./common/dic";
import { CONFIG } from "./config";
import RedisStore from "connect-redis";
import { RedisConnection } from "./common/cashing/redis.connection";
import cors from "cors";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.addSessions();
    this.registerMiddlewares();
    this.registerRoutes();
  }

  private registerMiddlewares(): void {
    this.app.use(
      cors({
        origin: CONFIG.server.allowedOrigins,
        credentials: true,
      })
    );
    // this.app.use(pinoHttp(logger)); // if you want to use pino logger as middleware for logging requests uncoment this line and import pinoHttp
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private registerRoutes(): void {
    const routerPrefix = "/api/v1";

    this.app.use(`${routerPrefix}/auth`, authController.router);
    this.app.use(`${routerPrefix}/ask-us`, askUsController.router);

    // health check route
    this.app.get("/health", (req: Request, res: Response) => {
      res.json({ status: "Ok" });
    });

    // 404 route
    this.app.use("/", (req: Request, res: Response) => {
      res.statusCode = 404;
      res.json({ status: "Error", message: "Not Found" });
    });
  }

  private addSessions(): void {
    const redisConnection = RedisConnection.getInstance();

    const redisStore = new RedisStore({
      client: redisConnection.getClient(),
      ttl: 86400,
      prefix: "sid:",
    });

    this.app.use(
      session({
        store: redisStore,
        secret: CONFIG.server.sessionSecret,
        resave: false,
        saveUninitialized: false,
        name: "sid",
        cookie: {
          secure: CONFIG.server.nodeEnv === "prod" ? true : false, // Set to true if using HTTPS
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        },
      })
    );
  }
}
