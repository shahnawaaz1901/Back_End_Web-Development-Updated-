import JobModel from "../models/job.model.js";
import path from "path";

export default class JobController {
  getHomePage(req, res) {
    res.render("index", { title: "Easy - A Job Portal" });
  }

  getJobPage(req, res) {
    let jobs = JobModel.getJobData();
    res.render("jobs", {
      title: "Easy - Jobs Section",
      jobs,
    });
  }

  getJobDescription(req, res) {
    const id = req.params.id;
    const jobData = JobModel.getJobById(id);
    res.render("job-description", {
      title: "Job Description",
      job: jobData,
    });
  }

  addJobApplicant(req, res) {}
}
