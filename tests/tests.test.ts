import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/database.js";
import { generateNewTestBody } from "./factories/testsFactory.js";
import { generateToken } from "./factories/userFactory.js";

const agent = supertest(app);

describe("POST /tests", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`;
    await prisma.$executeRaw`TRUNCATE TABLE tests`;
  });

  it("given valid input and token, should return 201", async () => {
    const body = generateNewTestBody();
    const token = generateToken();
    const response = await agent
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(response.status).toBe(201);
  });

  it("no token given, should return 401", async () => {
    const body = generateNewTestBody();
    const response = await agent.post("/tests").send(body);
    expect(response.status).toBe(401);
  });

  it("given invalid input, should return 422", async () => {
    const body = {};
    const token = generateToken();
    const response = await agent
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(response.status).toBe(422);
  });

  it("given invalid token, should return 401", async () => {
    const body = generateNewTestBody();
    const token = "";
    const response = await agent
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(response.status).toBe(401);
  });

  it("given invalid category, should return 404", async () => {
    let body = generateNewTestBody();
    body.categoryId = -1;
    const token = generateToken();
    const response = await agent
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(response.status).toBe(404);
  });

  it("given invalid discipline, should return 404", async () => {
    let body = generateNewTestBody();
    body.disciplineId = -1;
    const token = generateToken();
    const response = await agent
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(response.status).toBe(404);
  });

  it("given invalid teacher, should return 404", async () => {
    let body = generateNewTestBody();
    body.teacherId = -1;
    const token = generateToken();
    const response = await agent
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(response.status).toBe(404);
  });

  it("given not matching teacher and discipline, should return 404", async () => {
    let body = generateNewTestBody();
    body.teacherId = 1;
    body.disciplineId = 5;
    const token = generateToken();
    const response = await agent
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(response.status).toBe(404);
  });
});
