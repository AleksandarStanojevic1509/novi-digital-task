import { Router, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { validateDto } from "../../common/middlewares";
import { ICustomSession } from "./interfaces";
import { LoginUserDto, RegisterUserDto } from "./dtos";

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

  private async register(req: Request, res: Response) {
    try {
      const registeredUser = await this.authService.register(req.body);
      (req.session as ICustomSession).user = registeredUser;
      (req.session as ICustomSession).sid = req.session.id;
      res.status(200).json({ user: registeredUser, success: true });
    } catch (error) {
      res
        .status(400)
        .json({ message: (error as Error).message, success: false });
    }
  }

  private async login(req: Request, res: Response) {
    try {
      const user = await this.authService.login(req.body);
      (req.session as ICustomSession).user = user;
      (req.session as ICustomSession).sid = req.session.id;
      res.status(200).json({ user, success: true });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
      throw error;
    }
  }

  private async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Failed to log out", success: false });
      }

      res.clearCookie("sid");
      res
        .status(200)
        .json({ message: "Logged out successfully", success: true });
    });
  }
}
