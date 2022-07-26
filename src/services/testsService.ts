import testsRepository from "../repositories/testsRepository.js";
export interface CreateTest {
  name: string;
  pdfUrl: string;
  categoryId: number;
  disciplineId: number;
  teacherId: number;
}

async function createTest(test: CreateTest) {
  const discipline = await testsRepository.getDisciplineById(test.disciplineId);
  if (!discipline) {
    throw {
      type: "error_not_found",
      message: "Discipline not found",
    };
  }
  const teacher = await testsRepository.getTeacherById(test.teacherId);
  if (!teacher) {
    throw {
      type: "error_not_found",
      message: "Teacher not found",
    };
  }
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

async function getTestsGroupedByDisciplines() {
  const tests = await testsRepository.getTestsGroupedByDisciplines();
  return tests;
}

async function getTestsGroupedByTeachers() {
  const tests = await testsRepository.getTestsGroupedByTeachers();
  return tests;
}

async function getCategories() {
  const categories = await testsRepository.getCategories();
  return categories;
}

const testsService = {
  createTest,
  getTestsGroupedByDisciplines,
  getCategories,
  getTestsGroupedByTeachers,
};
export default testsService;
