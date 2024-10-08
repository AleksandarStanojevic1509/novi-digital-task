import { IRepository } from "../../common/interfaces";
import { IUser } from "./interfaces";
import User from "./user.model";

export class UserRepository implements IRepository<IUser> {
  async create(data: Partial<IUser>): Promise<IUser> {
    try {
      const user = new User(data);

      return await user.save();
    } catch (error) {
      throw new Error(`Error creating user: ${(error as Error).message}`);
    }
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }

  async findOne(id: string): Promise<IUser> {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found by id.");
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found by email.");
    }

    return user;
  }
}
