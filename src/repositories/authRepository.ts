import prisma from "../database.js";

async function getUserByEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  return user;
}

async function register(email: string, password: string) {
  await prisma.users.create({
    data: {
      email,
      password,
    },
  });
}

const authRepository = { register, getUserByEmail };
export default authRepository;
