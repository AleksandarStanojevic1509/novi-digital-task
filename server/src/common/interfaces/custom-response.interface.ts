import { Response } from "express";

export interface ICustomResponse extends Response {
  user?: any;
}
