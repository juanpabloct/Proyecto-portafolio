import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const validUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, informationUsuario } = req.body;
  if (
    email &&
    password &&
    informationUsuario &&
    Object.keys(informationUsuario).length > 0
  ) {
    next();
  } else {
    res.status(404).json("Invalid Properties");
  }
};
