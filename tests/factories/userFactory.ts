import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function generateSignUpBody() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function generateToken() {
  if (process.env.JWT_SECRET) {
    const token = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: 5,
    });
    return token;
  } else {
    throw {
      type: "error_internal",
      message: "JWT_SECRET not set, check .env file",
    };
  }
}
