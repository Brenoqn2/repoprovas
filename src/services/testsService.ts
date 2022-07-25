import testsRepository from "../repositories/testsRepository.js";
export interface CreateTest {
  name: string;
  pdfUrl: string;
  categoryId: number;
  disciplineId: number;
  teacherId: number;
}

async function createTest(test: CreateTest) {
  const teacherDisciplineId = await testsRepository.getTeachersDisciplinesId(
    test.teacherId,
    test.disciplineId
  );
  if (!teacherDisciplineId) {
    throw {
      type: "error_not_found",
      message: "Teacher and discipline do not match",
    };
  }
  const category = await testsRepository.getCategoryById(test.categoryId);
  if (!category) {
    throw {
      type: "error_not_found",
      message: "Category not found",
    };
  }
  await testsRepository.createTest({
    name: test.name,
    pdfUrl: test.pdfUrl,
    categoryId: test.categoryId,
    teacherDisciplineId,
  });
}

const testsService = { createTest };
export default testsService;
