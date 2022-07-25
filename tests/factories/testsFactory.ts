import { faker } from "@faker-js/faker";

export function generateNewTestBody() {
  return {
    name: faker.lorem.sentence(),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    disciplineId: 1,
    teacherId: 1,
  };
}
