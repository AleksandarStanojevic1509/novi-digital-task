import { Router, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { validateDto } from "../../common/middlewares";
import { ICustomSession } from "./interfaces";
import { LoginUserDto, RegisterUserDto } from "./dtos";
import logger from "../../common/logger/logger";
import { redisConnection } from "../../common/dic";

export class AuthController {
  public router: Router;

  constructor(private authService: AuthService) {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.post(
      "/register",
      validateDto(RegisterUserDto),
      this.register.bind(this)
    );
    this.router.post(
      "/login",
      validateDto(LoginUserDto),
      this.login.bind(this)
    );
    this.router.post("/logout", this.logout.bind(this));
  }

  private async register(req: Request, res: Response): Promise<void> {
    try {
      const registeredUser = await this.authService.register(req.body);
      (req.session as ICustomSession).userId = registeredUser._id;
      (req.session as ICustomSession).sid = req.session.id;
      res.status(200).json({ user: registeredUser, success: true });
    } catch (error) {
      res
        .status(400)
        .json({ message: (error as Error).message, success: false });
    }
  }

  private async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.login(req.body);
      (req.session as ICustomSession).userId = user._id;
      (req.session as ICustomSession).sid = req.session.id;
      res.status(200).json({ user, success: true });
    } catch (error) {
      logger.error(`Login error: ${error}`); // Log the error for debugging
      res.status(400).json({ message: `${error}` });
    }
  }

  private async logout(req: Request, res: Response): Promise<void> {
    const sessionId = req.session.id;

    req.session.destroy(async (err) => {

      if (err) {
        // Handle error while destroying session
        return res
          .status(500)
          .json({ message: "Failed to log out", success: false });
      }

      try {
        await redisConnection.getClient().del(`sid:${sessionId}`);
      } catch (error) {
        console.error("Error deleting session key from Redis:", error);
      }
  

      // Clear the sid cookie and send response after successful destruction
      res.clearCookie("sid", { path: "/" });

      res
        .status(200)
        .json({ message: "Logged out successfully", success: true });
    });
  }
}
