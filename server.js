const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dbConfig = require("./config/database.config.js");
const UserRoute = require("./app/routes/User");
const PostRoute = require("./app/routes/Post");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello max-project-server" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

app.use("/user", UserRoute);
app.use("/post", PostRoute);
