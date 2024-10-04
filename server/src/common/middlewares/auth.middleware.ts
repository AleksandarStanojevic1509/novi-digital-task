import { Request, Response, NextFunction } from "express";
import { RedisConnection } from "../cashing/redis.connection";
import { UserRepository } from "../../modules/user/user.repository";
import { ICustomResponse } from "../interfaces/custom-response.interface";

const redisClient = RedisConnection.getInstance().getClient();
const userRepository = new UserRepository();

const doAuth = async (req: Request, res: ICustomResponse, next: NextFunction): Promise<void> => {
  try {
    if (!req.session || !req.session.id) {
      res.status(401).json({ message: "Unauthorized: missing session in request", success: false });
    }

    const session = await redisClient.get(`sid:${req.session.id}`);
    if (!session) {
      res.status(401).json({ message: "Unauthorized: missing session data in redis", success: false });
    }

    const user = session ? JSON.parse(session).user : null;
    if (!user) {
      res.status(401).json({ message: "Unauthorized: missing user in session data", success: false });
    }
   
    res.user = await userRepository.findOne(user._id);
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server Error', success: false });
  }
};

export { doAuth };
