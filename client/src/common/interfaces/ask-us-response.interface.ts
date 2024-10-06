import { IUser } from "./user.interface";

export interface IAskUsResponse {
  user: IUser;
  success: boolean;
}