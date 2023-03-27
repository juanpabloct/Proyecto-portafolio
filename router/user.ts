import { Prisma, User } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { UploadedFile } from "express-fileupload";
import { awsS3 } from "../aws/connectAws";
import { client } from "../client";
import { CreateUser } from "../controllers/user/CreateUser";
import { LoginUser } from "../controllers/user/loginUser";
import { ValidUserNotExist } from "../midlewares/validUserNotExist";
import { USER } from "../types";
interface ReqParams {
  email: string;
  password: string;
}
interface ErrorUser {
  error: string;
  status: number;
}
const app = Router();
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.post("/newUser", ValidUserNotExist, async (req: Request, res: Response) => {
  try {
    const newUser = (await CreateUser(req.body)) as User;
    res.status(200).json({ ...newUser, password: undefined });
  } catch (err: any) {
    res.status(err.status).json(err.error);
  }
});

app.post("/login", async (req: Request, res) => {
  const infoLogin = req.body
    .params as Prisma.UserEmailPasswordCompoundUniqueInput;
  try {
    const data = await LoginUser(infoLogin);
    res.status(200).json({ ...data, message: "Accedio Correctamente" });
  } catch (err: any) {
    res.status(err.status).json({ message: err.error });
  }
});
app.post("/login/addPhoto", async (req: Request, res) => {
  const image: any = req.files["image[]"];
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
  awsS3.upload(params, function (err, data) {
    if (err) res.status(+err.code).json({ mesagges: err.message });
    else {
      const url = awsS3.getSignedUrl("getObject", {
        Bucket: data.Bucket,
        Key: data.key,
      });
      res.status(200).json({
        mesagges: `Subido en la ruta ${url}`,
      });
    }
  });
});
module.exports = app;
