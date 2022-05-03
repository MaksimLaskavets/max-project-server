const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: "http://localhost:3000",
  credential: true,
  optionSuccessStatus: 200,
};

const dbConfig = require("./config/database.config.js");
const UserRoute = require("./app/routes/User");
const PostRoute = require("./app/routes/Post");
const AuthRoutes = require("./app/routes/authRoutes");
const CommentRoutes = require("./app/routes/Comment");

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

app.get("/set-cookies", (req, res) => {
  res.cookie("userName", "Max");
  res.cookie("isAuthenticated", true, { httpOnly: true });
  res.send("cookies are set");
});

app.get("/get-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello max-project-server" });
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use(AuthRoutes);
app.use("/comment", CommentRoutes);
