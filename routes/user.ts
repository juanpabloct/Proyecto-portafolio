import { Router } from "express";
import { DATE } from "sequelize";
import { createUser, ParamsBody } from "../controllers/user";

const app = Router();

app.post("/RegisterUser", async (req, res) => {
  const { informationOfUser, user } = req.body as ParamsBody;
  const newuser = {
    ...informationOfUser,
    user: {
      ...user,
      dateOfBirth: new Date(informationOfUser.dateOfBirth.replaceAll("/", ",")),
    },
  };
  const { message, data, status } = await createUser(req.body);
  status === 200
    ? res.status(status).json({ message, data })
    : res.status(status).json({ message });
});
module.exports = app;
