import { ConnectOptions, Connection, connect, connection } from "mongoose";
import { IMongoConnection } from "./connection-mongo.interface";
import { CONFIG } from "../../config";
import logger from "../logger/logger";

export class MongoDbConnection implements IMongoConnection {
  private static instance: MongoDbConnection;
  private connection: Connection;

  private constructor() {
    this.connection = connection;
  }

  public static getInstance(): MongoDbConnection {
    if (!MongoDbConnection.instance) {
      MongoDbConnection.instance = new MongoDbConnection();
    }
    return MongoDbConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      if (!this.connection.readyState) {
        await connect(
          CONFIG.mongoDB.uri as string,
          this.getConnectionOptions()
        );
        logger.info("MongoDB connection established.");
      } else {
        logger.info("MongoDB is already connected.");
      }
    } catch (error) {
      logger.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      if (this.connection.readyState) {
        await this.connection.close();
        logger.info("MongoDB connection closed.");
      } else {
        logger.info("MongoDB is not connected.");
      }
    } catch (error) {
      logger.error("Error disconnecting from MongoDB:", error);
      throw error;
    }
  }

  public getConnection(): Connection {
    return this.connection;
  }

  public getConnectionOptions(): ConnectOptions {
    return {
      dbName: CONFIG.mongoDB.dbName,
    } as ConnectOptions;
  }
}
