// redis-connection.ts
import Redis, { Redis as RedisClient, Redis as RedisOptions } from "ioredis";
import { IRedisConnection } from "./connection-redis.interface";
import { CONFIG } from "../../config";
import logger from "../logger/logger";

export class RedisConnection implements IRedisConnection {
  private static instance: RedisConnection;
  private client: RedisClient;

  private constructor() {
    this.client = new Redis(CONFIG.redis.uri as string);
  }

  public static getInstance(): RedisConnection {
    if (!RedisConnection.instance) {
      RedisConnection.instance = new RedisConnection();
    }
    return RedisConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      await this.client.ping();
      logger.info("Redis connection established.");
    } catch (error) {
      logger.error("Error connecting to Redis:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.client.quit();
      logger.info("Redis connection closed.");
    } catch (error) {
      logger.error("Error disconnecting from Redis:", error);
      throw error;
    }
  }

  public getClient(): Redis {
    return this.client;
  }
}
