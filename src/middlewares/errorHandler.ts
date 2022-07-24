import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (err.type === "error_schema") {
    return res.status(422).send(err.message);
  }
  if (err.type === "error_conflict") {
    return res.status(409).send(err.message);
  }
  if (err.type === "error_not_found") {
    return res.status(404).send(err.message);
  }
  if (err.type === "error_unauthorized") {
    return res.status(401).send(err.message);
  }
  if (err.type === "error_forbidden") {
    return res.status(403).send(err.message);
  }
  if (err.type === "error_internal") {
    console.log(err.message);
    return res.status(500).send("Something went wrong");
  }

  res.status(500).send("Something broke!");

  next(err);
};

export default errorHandler;
