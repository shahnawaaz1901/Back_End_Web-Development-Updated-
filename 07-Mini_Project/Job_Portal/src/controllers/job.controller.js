import JobModel from "../models/job.model.js";
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
}