import { Connection, ConnectOptions } from "mongoose";
import { IConnection } from "../interfaces";

export interface IMongoConnection extends IConnection {
  getConnection(): Connection;
  getConnectionOptions(): ConnectOptions;
}
