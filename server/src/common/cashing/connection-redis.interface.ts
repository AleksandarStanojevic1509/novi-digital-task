import { Redis as RedisClient } from "ioredis";
import { IConnection } from "../interfaces";

export interface IRedisConnection extends IConnection {
  getClient(): RedisClient;
}
