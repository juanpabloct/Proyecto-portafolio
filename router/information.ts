import { Request, Response, Router } from "express";
import { allUsers } from "../controllers/information/allUsers";

const app = Router();

app.get("/", async (req: Request, res: Response) => {
  const users = await allUsers();
  res.status(200).json(users);
});
module.exports = app;
