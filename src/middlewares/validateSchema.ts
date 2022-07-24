import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      throw {
        type: "error_schema",
        message: error.details[0].message,
      };
    }

    next();
  };
}

export default validateSchema;
