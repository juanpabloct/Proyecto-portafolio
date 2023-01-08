const express = require("express");
const app = express();
const verifyRoute = require("./routes/index.ts");
app.use(express.json());
app.use("/", require("./routes/index.ts"));
app.use("/", require("./routes/user.ts"));
app.listen(3000, () => {
  console.log(`Run in Port ${3000}`);
});
