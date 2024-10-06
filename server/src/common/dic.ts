/**
 * Dependency injection container
 * Currently, we are using the manual way to inject dependencies
 * In the future, we can use a library like InversifyJS ot Tsyringe
 */

import { AskUsController } from "../modules/ask_us/ask_us.controller";
import { AskUsRepository } from "../modules/ask_us/ask_us.repository";
import { AskUsService } from "../modules/ask_us/ask_us.service";
import { AuthController } from "../modules/auth/auth.controller";
import { AuthService } from "../modules/auth/auth.service";
import { UserRepository } from "../modules/user/user.repository";
import { UserService } from "../modules/user/user.service";
import { RedisConnection } from "./cashing/redis.connection";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);
const userService = new UserService(userRepository);

const askUsRepository = new AskUsRepository();
const askUsService = new AskUsService(askUsRepository);
const askUsController = new AskUsController(askUsService);

const redisConnection = RedisConnection.getInstance();

export {
  authController,
  authService,
  userService,
  askUsController,
  redisConnection
};
