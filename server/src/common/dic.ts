/**
 * Dependency injection container
 */

import { AskUsController } from "../modules/ask_us/ask_us.controller";
import { AskUsRepository } from "../modules/ask_us/ask_us.repository";
import { AskUsService } from "../modules/ask_us/ask_us.service";
import { AuthController } from "../modules/auth/auth.controller";
import { AuthService } from "../modules/auth/auth.service";
import { UserRepository } from "../modules/user/user.repository";
import { UserService } from "../modules/user/user.service";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);
const userService = new UserService(userRepository);

const askUsRepository = new AskUsRepository();
const askUsService = new AskUsService(askUsRepository);
const askUsController = new AskUsController(askUsService);

export {
  authController,
  authService,
  userService,
  askUsController,
};