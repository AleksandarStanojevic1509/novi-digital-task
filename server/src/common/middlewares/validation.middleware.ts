import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

const validateDto = (dto: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any | void> => {
    const dtoObject = plainToInstance(dto, req.body);

    const errors = await validate(dtoObject);
    if (errors.length > 0) {
      const formattedErrors = errors
        .map((error) => Object.values(error.constraints || {}).join(", "))
        .join(", ");

      return res.status(400).json({
        message: `Validation failed: ${formattedErrors}`,
        success: false,
      });
    }

    next();
  };
};

export { validateDto };
