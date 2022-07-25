import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function validateJWT(req: Request, res: Response, next: NextFunction) {
  console.log(req.headers);
  const { authorization } = req.headers;
  if (!authorization || typeof authorization !== "string") {
    throw {
      type: "error_unauthorized",
      message: "No token provided",
    };
  }
  const token = authorization.split(" ")[1];
  if (!token || typeof token !== "string") {
    throw {
      type: "error_unauthorized",
      message: "No token provided",
    };
  }
  if (process.env.JWT_SECRET) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || !decoded) {
        throw {
          type: "error_unauthorized",
          message: "Invalid token",
        };
      }
    });
  } else {
    throw {
      type: "error_internal",
      message: "JWT_SECRET not set, check .env file",
    };
  }

  next();
}

export default validateJWT;
