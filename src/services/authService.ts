import bcrypt from "bcrypt";
import authRepository from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";

async function register(email: string, password: string) {
  const alreadyUsedEmail = await authRepository.getUserByEmail(email);
  if (alreadyUsedEmail) {
    throw {
      type: "error_conflict",
      message: "Email already used",
    };
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  await authRepository.register(email, hashedPassword);
}

async function login(email: string, password: string) {
  const user = await authRepository.getUserByEmail(email);
  if (!user) {
    throw {
      type: "error_not_found",
      message: "Email not found",
    };
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw {
      type: "error_unauthorized",
      message: "Email or password incorrect",
    };
  }

  if (process.env.JWT_SECRET) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    return token;
  } else {
    throw {
      type: "error_internal",
      message: "JWT_SECRET not set, check .env file",
    };
  }
}

const authService = { register, login };
export default authService;
