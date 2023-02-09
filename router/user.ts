import { Prisma, User } from "@prisma/client";
import { Request, Response, Router, RequestHandler } from "express";
import { CreateUser } from "../controllers/user/CreateUser";
import { LoginUser } from "../controllers/user/loginUser";
import { ValidUserNotExist } from "../midlewares/validUserNotExist";
interface ReqParams {
  email: string;
  password: string;
}
interface ErrorUser {
  error: string;
  status: number;
}
const app = Router();
app.post("/newUser", ValidUserNotExist, async (req: Request, res: Response) => {
  try {
    const newUser = await CreateUser(req.body);
    res.status(200).json(newUser);
  } catch (err: any) {
    res.status(err.status).json(err.error);
  }
});
app.post("/login", async (req: Request, res) => {
  const infoLogin = req.body as Prisma.UserEmailPasswordCompoundUniqueInput;
  try {
    const data = await LoginUser(infoLogin);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(err.status).json(err.error);
  }
});

module.exports = app;
