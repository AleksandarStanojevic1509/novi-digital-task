import { Router, Request, Response } from "express";
import { AskUsService } from "./ask_us.service";
import { validateDto } from "../../common/middlewares";
import { CreateInquireDto } from "./dtos";
import { doAuth } from "../../common/middlewares/auth.middleware";
import { ICustomRequest } from "../../common/interfaces";

export class AskUsController {
  public router: Router;

  constructor(private askUsService: AskUsService) {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.post(
      "/inquire",
      doAuth,
      validateDto(CreateInquireDto),
      this.askUs.bind(this)
    );
  }

  async askUs(req: ICustomRequest, res: Response) {
    try {
      const user = req.user;
      const inquireData = {
        ...req.body,
        userEmail: user.email,
        userFullName: `${user.firstName} ${user.lastName}`,
      };
      const inquire = await this.askUsService.askUsQuestion(inquireData);
      res.status(200).json({ user, inquire, success: true });
    } catch (error) {
      res
        .status(400)
        .json({ message: (error as Error).message, success: false });
    }
  }
}
