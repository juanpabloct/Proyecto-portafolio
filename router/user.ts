import { Prisma, User } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { CreateUser } from "../controllers/user/CreateUser";
import { LoginUser } from "../controllers/user/loginUser";
import { ValidUserNotExist } from "../midlewares/validUserNotExist";
const app = Router();
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.post("/newUser", ValidUserNotExist, async (req: Request, res: Response) => {
  const image = req.files["image"];
  try {
    const newUser = (await CreateUser(req.body, image)) as User;
    res.status(200).json({ ...newUser, password: undefined });
  } catch (err: any) {
    res.status(err.status).json(err.error);
  }
});

app.post("/login", async (req: Request, res) => {
  const infoLogin = req.body
    .params as Prisma.UserEmailPasswordCompoundUniqueInput;
  try {
    const data: any = await LoginUser(infoLogin);
    res.status(200).json({ ...data, message: "Accedio Correctamente" });
  } catch (err: any) {
    res.status(err.status).json({ message: err.error });
  }
});
app.post("/login/addPhoto", async (req: Request, res: Response) => {
  const image: any = req.files["image"];
  const params = {
    Bucket: "portafolios3jp",
    Key: image.name,
    Body: image.data,
    ContentType: "image/jpeg",
    accessControlPolicy: {
      grants: [
        {
          permission: "FULL_CONTROL",
        },
      ],
    },
  };
  res.json("");
});
module.exports = app;
