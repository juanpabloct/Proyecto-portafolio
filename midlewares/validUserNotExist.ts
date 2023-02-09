import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { client } from "../client";

export const ValidUserNotExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body.user;
  const verifyClient = await client.user.findUnique({
    where: { email },
  });
  if (verifyClient) {
    res.status(400).json("Usuario ya existe");
  } else {
    next();
  }
};
