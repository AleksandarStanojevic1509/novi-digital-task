import { App } from "./app";
import { CONFIG } from "./config";
import logger from "./common/logger/logger";
import { InitAppType } from "./common/types";
import { MongoDbConnection } from "./common/db/mongo-db.connection";
import { RedisConnection } from "./common/cashing/redis.connection";

const bootstrap = async () => {
  const initOptions: InitAppType = {
    mongoInit: false,
    redisInit: false,
  };

  try {
    const appInstance = new App();

    if (!initOptions.mongoInit) {
      const mongoDbConnection = MongoDbConnection.getInstance();
      await mongoDbConnection.connect();
      initOptions.mongoInit = true;
    }

    if (!initOptions.redisInit) {
      const redisConnection = RedisConnection.getInstance();
      await redisConnection.connect();
      initOptions.redisInit = true;
    }

    for (const [key, value] of Object.entries(initOptions)) {
      if (!value) {
        logger.error(
          { error: `${key} initialization failed.` },
          "Error bootstrapping application:"
        );
        process.exit(1);
      }
    }

    const server = appInstance.app.listen(CONFIG.server.port, () => {
      logger.info(`Server is running on ${CONFIG.server.port}.`);
    });

    const gracefulShutdown = async () => {
      logger.warn("Received shutdown signal, closing server gracefully...");
      server.close(async (err) => {
        if (err) {
          logger.error("Error closing server:", err);
          return process.exit(1);
        }

        await MongoDbConnection.getInstance().disconnect();
        await RedisConnection.getInstance().disconnect();

        logger.info("Server closed successfully.");
        process.exit(0);
      });
    };

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);
  } catch (error) {
    logger.error({ error }, "Error bootstrapping application:");
    process.exit(1);
  }
};

bootstrap();
