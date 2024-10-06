import { Session } from "express-session";

export interface ICustomSession extends Session {
  user: any;
  sid: string;
}
