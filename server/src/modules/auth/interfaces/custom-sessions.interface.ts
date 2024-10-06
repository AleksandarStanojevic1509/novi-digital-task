import { Session } from "express-session";

export interface ICustomSession extends Session {
  userId: any;
  sid: string;
}
