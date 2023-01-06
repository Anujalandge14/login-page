import { validationResult } from "express-validator";

const errorValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array().map((err) => err.msg) });
    return;
  }
  next();
};

export { errorValidation };
