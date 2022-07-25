import { Router } from "express";
import testsController from "../controllers/testsController.js";
import validateJWT from "../middlewares/validateToken.js";
import validateSchema from "../middlewares/validateSchema.js";
import testsSchema from "../schemas/testsSchema.js";

const testsRouter = Router();
testsRouter.post(
  "/tests",
  validateJWT,
  validateSchema(testsSchema.createTestSchema),
  testsController.createTest
);

testsRouter.get("/tests", validateJWT, testsController.getTests);
testsRouter.get("/categories", validateJWT, testsController.getCategories);

export default testsRouter;
