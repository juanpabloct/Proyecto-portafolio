import { client } from "./client";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", require("./router/user"));

client.$connect().then(() => {
  app.listen(9000, () => {
    console.log(`Run in Port ${9000}`);
  });
});
