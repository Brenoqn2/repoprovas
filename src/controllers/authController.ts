import { Request, Response } from "express";
import authService from "../services/authService.js";
import { Users } from "@prisma/client";

async function signUp(req: Request, res: Response) {
  const { email, password }: Users = req.body;
  await authService.register(email, password);
  res.sendStatus(201);
}

async function signIn(req: Request, res: Response) {
  const { email, password }: Users = req.body;
  const token = await authService.login(email, password);
  res.send({ token });
}

const authController = { signIn, signUp };
export default authController;
