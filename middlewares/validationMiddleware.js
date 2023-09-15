import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        console.log(errorMessages);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("Company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("Job Location  is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid job status"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValid = await mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new BadRequestError("Invalid MongoDB ID");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${id}`);
  }),
]);
