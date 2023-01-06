import { Router } from "express";
import { body, validationResult } from "express-validator";
import { errorValidation } from "../middleware/errorValidation.js";
import { UserModel } from "../model/UserModel.js";

const loginRouter = Router();

loginRouter.post(
  "/api/login",
  [
    body("email").isEmail().withMessage("Please provide valid email"),
    body("password").notEmpty().withMessage("Please provide a password"),
  ],
  errorValidation,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw "This email is not registered";
      }
      if (password !== user.password) {
        throw "Incorrect password";
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(403).send({ errors: [error] });
    }
  }
);

export { loginRouter };
