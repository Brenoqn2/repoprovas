import app from "../src/app.js";
import supertest from "supertest";
import { generateSignUpBody } from "./factories/userFactory.js";
import prisma from "../src/database.js";

const agent = supertest.agent(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
});

describe("POST /sign-up", () => {
  it("given valid email and password, should return 201", async () => {
    const body = generateSignUpBody();
    const response = await agent.post("/sign-up").send(body);
    expect(response.status).toBe(201);
  });

  it("given invalid input, should return 422", async () => {
    const body = {};
    const response = await agent.post("/sign-up").send(body);
    expect(response.status).toBe(422);
  });

  it("given already used email, should return 409", async () => {
    const body = generateSignUpBody();
    await agent.post("/sign-up").send(body);
    const response = await agent.post("/sign-up").send(body);
    expect(response.status).toBe(409);
  });
});

describe("POST /sign-in", () => {
  it("given valid email and password, should return 200 and token", async () => {
    const body = generateSignUpBody();
    await agent.post("/sign-up").send(body);
    const response = await agent.post("/sign-in").send(body);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("given invalid input, should return 422", async () => {
    const body = {};
    const response = await agent.post("/sign-in").send(body);
    expect(response.status).toBe(422);
  });

  it("given not found email, should return 404", async () => {
    const body = generateSignUpBody();
    const response = await agent.post("/sign-in").send(body);
    expect(response.status).toBe(404);
  });

  it("given wrong password, should return 401", async () => {
    let body = generateSignUpBody();
    await agent.post("/sign-up").send(body);
    body.password = "wrong password";
    const response = await agent.post("/sign-in").send(body);
    expect(response.status).toBe(401);
  });
});
