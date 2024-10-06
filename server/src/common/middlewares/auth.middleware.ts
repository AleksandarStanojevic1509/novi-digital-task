import { Response, NextFunction } from "express";
import { RedisConnection } from "../cashing/redis.connection";
import { UserRepository } from "../../modules/user/user.repository";
import { ICustomRequest } from "../interfaces";

const redisClient = RedisConnection.getInstance().getClient();
const userRepository = new UserRepository();

const doAuth = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.session || !req.session.id) {
      return res.status(401).json({
        message: "Unauthorized: missing session in request",
        success: false,
      });
    }

    const session = await redisClient.get(`sid:${req.session.id}`);

    if (!session) {
      return res.status(401).json({
        message: "Unauthorized: missing session data in redis",
        success: false,
      });
    }

    const user = session ? JSON.parse(session).user : null;
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: missing user in session data",
        success: false,
      });
    }

    req.user = await userRepository.findOne(user._id);

    if (req.user) {
      return next();
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized: user not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
};

export { doAuth };
