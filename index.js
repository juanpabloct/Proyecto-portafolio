var express = require("express");
var app = express();
app.use("./routes/index.ts");
app.listen(3000, function () {
    console.log("Run in Port ".concat(3000));
});
