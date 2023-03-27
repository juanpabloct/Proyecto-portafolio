import morgan from "morgan";
import fileUpload from "express-fileupload";
import { client } from "./client";
import express from "express";
import cors from "cors";
import helmet from "helmet";
require("dotenv").config();
const app = express();
app.use(helmet());
app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/user", require("./router/user"));
app.use("/users", require("./router/information"));

client.$connect().then(() => {
  app.listen(9000, () => {
    console.log(`Run in Port ${9000}`);
  });
});
