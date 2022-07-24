import bcrypt from "bcrypt";
import authRepository from "../repositories/authRepository.js";

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

const authService = { register };
export default authService;
