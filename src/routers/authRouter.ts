import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import authSchema from "../schemas/authSchema.js";
import authController from "../controllers/authController.js";

const authRouter = Router();
authRouter.post(
  "/sign-up",
  validateSchema(authSchema.signUpSchema),
  authController.signUp
);

authRouter.post(
  "/sign-in",
  validateSchema(authSchema.signInSchema),
  authController.signIn
);

export default authRouter;
