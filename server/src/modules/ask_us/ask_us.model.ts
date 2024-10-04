import { model, Schema } from "mongoose";
import { Status } from "./enums";
import { IAskUs } from "./interfaces";

const askUsSchema = new Schema<IAskUs>(
  {
    question: { type: String, required: true },
    userEmail: { type: String, required: true },
    userFullName: { type: String, required: true },
    status: { type: String, enum: Status, default: Status.PENDING },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const AskUs = model<IAskUs>("ask_us", askUsSchema);
export default AskUs;
