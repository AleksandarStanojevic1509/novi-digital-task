import { Document } from 'mongoose';
import { Status } from '../enums';

export interface IAskUs extends Document {
  question: string;
  userEmail: string;
  userFullName: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}