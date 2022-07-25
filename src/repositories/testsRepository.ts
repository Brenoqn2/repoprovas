import prisma from "../database.js";
import { Tests } from "@prisma/client";

type CreateTest = Omit<Tests, "id">;

async function getCategoryById(categoryId: number) {
  const category = await prisma.categories.findUnique({
    where: { id: categoryId },
  });
  return category;
}

async function getTeachersDisciplinesId(
  teacherId: number,
  disciplineId: number
) {
  const teacherId_disciplineId = { teacherId, disciplineId };
  const teacherDiscipline = await prisma.teachersDisciplines.findUnique({
    where: { teacherId_disciplineId },
  });
  return teacherDiscipline.id;
}

async function createTest(test: CreateTest) {
  await prisma.tests.create({
    data: test,
  });
}

const testsRepository = {
  createTest,
  getTeachersDisciplinesId,
  getCategoryById,
};
export default testsRepository;
