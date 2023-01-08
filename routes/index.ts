import { Request, Response, Router } from "express";
import allInformation from "../associations";
const modelUser = require("");
const data = require("../database/index");
const app = Router();

app.get("/verify", async (req: Request, res: Response) => {
  await data();
  res.json("HASDF");
});
app.get("/getUsers", async (req: Request, res: Response) => {
  const usuarios = await modelUser.findAll();
  res.json(usuarios);
});
app.get("/informationUser", async (req: Request, res: Response) => {
  allInformation;
  res.json("");
});
module.exports = app;
