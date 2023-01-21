import { Request, Response, Router } from "express";
import { CreateUser } from "../controllers/user";

const app = Router();
app.get("/newUser", (req: Request, res: Response) => {
  CreateUser(req.body);
});
