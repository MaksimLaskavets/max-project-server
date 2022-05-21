import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import dbConfig from "./config/database.config.js";
import UserRoute from "./app/routes/User.js";
import PostRoute from "./app/routes/Post.js";
import AuthRoutes from "./app/routes/authRoutes.js";
import CommentRoutes from "./app/routes/Comment.js";

const corsOptions = {
  origin: "http://localhost:3000",
  credential: true,
  optionSuccessStatus: 200,
};

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
