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

async function getTests(req: Request, res: Response) {
  const { groupBy } = req.query;
  if (groupBy === "disciplines") {
    const tests = await testsService.getTestsGroupedByDisciplines();
    res.send({ tests });
    // } else if (groupBy === "teachers") {
    //   const tests = await testsService.getTestsGroupedByTeachers();
    //   res.send({ tests });
  } else {
    throw {
      type: "error_invalid_parameter",
      message: "Invalid parameter",
    };
  }
}

async function getCategories(req: Request, res: Response) {
  const categories = await testsService.getCategories();
  res.send({ categories });
}

const testsController = { createTest, getTests, getCategories };
export default testsController;
