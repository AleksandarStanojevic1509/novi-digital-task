import { IRepository } from "../../common/interfaces";
import { IAskUs } from "./interfaces";
import AskUs from "./ask_us.model";

export class AskUsRepository implements IRepository<IAskUs> {
  async create(data: Partial<IAskUs>): Promise<IAskUs> {
    try {
      const question = new AskUs(data);

      return await question.save();
    } catch (error) {
      throw new Error(`Error creating user: ${(error as Error).message}`);
    }
  }

  async update(id: string, data: Partial<IAskUs>): Promise<IAskUs> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<IAskUs[]> {
    throw new Error("Method not implemented.");
  }

  async findOne(id: string): Promise<IAskUs> {
    throw new Error("Method not implemented.");

  }
}
