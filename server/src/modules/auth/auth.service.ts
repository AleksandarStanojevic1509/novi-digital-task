import { IUser } from "../user/interfaces";
import { UserRepository } from "../user/user.repository";
import bcrypt from 'bcrypt';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(user: Partial<IUser>): Promise<IUser> {
    return await this.userRepository.create(user);
  }

  async login(userCredentials: IUser): Promise<IUser> {
    const user = await this.userRepository.findOneByEmail(userCredentials.email);
    
    if (!user || !(await bcrypt.compare(userCredentials.password, user.password))) {
      throw new Error('Invalid email or password');
      // return res.status(400).json({ message: 'Invalid email or password' });
    }

    return user;
  }

}
