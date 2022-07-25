import { Request, Response } from "express";
import testsService from "../services/testsService.js";
import { CreateTest } from "../services/testsService.js";

async function createTest(req: Request, res: Response) {
  const { name, pdfUrl, categoryId, disciplineId, teacherId }: CreateTest =
    req.body;
  await testsService.createTest({
    name,
    pdfUrl,
    categoryId: Number(categoryId),
    disciplineId: Number(disciplineId),
    teacherId: Number(teacherId),
  });
  res.sendStatus(201);
}

const testsController = { createTest };
export default testsController;
