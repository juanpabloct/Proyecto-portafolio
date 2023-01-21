import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const ValidEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as Prisma.UserCreateInput;
  const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (validEmail.test(email) && password.length > 4) next();
  else {
    res.status(404).json("Invalid Params");
  }
};
