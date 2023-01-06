import { Router } from "express";
import { body } from "express-validator";
import { errorValidation } from "../middleware/errorValidation.js";
import { UserModel } from "../model/UserModel.js";
const signUpRouter = Router();

signUpRouter.post(
  "/api/signup",
  [
    body("email").isEmail().withMessage("Please Enter valid email"),
    body("password")
      .isLength({
        min: 6,
        max: 20,
      })
      .withMessage("Password length must be between 6 to 20"),
    body("fullName").trim().notEmpty().withMessage("Please Enter your full name"),
  ],
  errorValidation,
  async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
      const storedUser = await UserModel.create({ fullName, email, password });
      if (!storedUser) {
        res.status(500).send({ errors: ["Server Error"] });
      }

      res.status(201).send(storedUser);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).send({ errors: ["Email already exists"] });
      }
      res.status(400).send({ erros: [error.message] });
    }
  }
);

export { signUpRouter };
