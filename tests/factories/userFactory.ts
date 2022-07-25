import { faker } from "@faker-js/faker";

export function generateSignUpBody() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
