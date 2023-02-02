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
  const newUser = CreateUser(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err: ErrorUser) => {
      res.status(err.status).json(err.error);
    });
});
app.get("/login", async (req: Request, res) => {
  const infoLogin = req.query as Prisma.UserEmailPasswordCompoundUniqueInput;
  const loginUser = LoginUser(infoLogin)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err: ErrorUser) => {
      res.status(err.status).json(err.error);
    });
});

module.exports = app;
