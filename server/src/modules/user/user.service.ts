import { IUser } from "./interfaces";
import { UserRepository } from "./user.repository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserDataForAuthMiddleware(id: string): Promise<Partial<IUser>> {
    return await this.userRepository.findOne(id);
  }
}
