import express from "express";
import JobController from "../controllers/job.controller.js";
import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/file-upload.middleware.js";

const jobRouter = express.Router();
const jobController = new JobController();

jobRouter.get("/", jobController.getJobPage);
jobRouter.get("/applicants/:id", auth, jobController.getJobApplicants);
jobRouter.post("/update",auth, jobController.postUpdateJob);
jobRouter.get("/update/:id", auth, jobController.getUpdateJobPage);
jobRouter.get("/postJob", auth, jobController.getPostJobPage);
jobRouter.post("/apply-job",upload.single('resume'), jobController.addJobApplicant);
jobRouter.post("/postJob", auth, jobController.postJob);
jobRouter.post("/delete-Job/:id",auth, jobController.deleteJob);
jobRouter.get("/:id", jobController.getJobDescription);

export default jobRouter;
