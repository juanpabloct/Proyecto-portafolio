import { client } from "./client";

const express = require("express");
const app = express();

app.use(express.json());
app.use("/user", require("./router/user"));

client.$connect().then(() => {
  app.listen(3000, () => {
    console.log(`Run in Port ${3000}`);
  });
});
