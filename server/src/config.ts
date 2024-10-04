import * as dotenv from "dotenv";
import session from "express-session";
import { get } from "mongoose";
dotenv.config();

/**
 * Retrieves the value of a required environment variable.
 * Throws an error if the required variable is not set and no default value is provided.
 *
 * @param {string} key - The name of the environment variable to retrieve.
 * @param {string} [defaultValue] - An optional default value to return if the environment variable is not set.
 * @returns {string} The value of the environment variable, or the provided default value.
 * @throws Will throw an error if the environment variable is not set and no default value is provided.
 */
const getFromEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is required but not set.`);
  }

  return value! ?? defaultValue;
};

export const CONFIG = {
  mongoDB: {
    uri: getFromEnv("MONGO_URI"),
    dbName: getFromEnv("MONGO_DATABASE"),
  },
  redis: {
    uri: getFromEnv("REDIS_URI"),
  },
  server: {
    port: getFromEnv("PORT", "3000"),
    sessionSecret: getFromEnv("SESSION_SECRET"),
    nodeEnv: getFromEnv("NODE_ENV"),
  },
};
