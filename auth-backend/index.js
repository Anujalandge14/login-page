import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { signUpRouter } from "./routes/signUp.js";
import { loginRouter } from "./routes/login.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(signUpRouter);
app.use(loginRouter);

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/Auth", (error) => {
  if (error) {
    console.log(error.message);
  }
  console.log("Connected");
  app.listen(3001, () => console.log("Listening on port 3001"));
});
