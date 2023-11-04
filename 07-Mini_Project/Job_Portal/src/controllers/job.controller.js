import JobModel from "../models/job.model.js";
import path from "path";

export default class JobController {
  getHomePage(req, res) {
    res.render("index", { title: "Job Portal | Easily", name: req.session.name });
  }

  getJobPage(req, res) {
    let jobs = JobModel.getJobData();
    res.render("jobs", {
      title: "Jobs | Easily",
      name : req.session.name,
      jobs,
      
    });
  }

  getJobDescription(req, res) {
    const id = req.params.id;
    const jobData = JobModel.getJobById(id);
    res.render("job-description", {
      title: "Job Description | Easily",
      job: jobData,
      name : req.session.name
    });
  }

  addJobApplicant(req, res) {
    const { id, name, email, contact } = req.body;
    const resume = path.join("public", "data", req.file.filename);
    const obj = {
      id,
      name,
      email,
      contact,
      resume,
    };
    JobModel.addApplicants(obj);
    res.render("jobs",{name : req.session.name, });
  }

  getJobApplicants(req, res) {
    const id = req.params.id;
    const job = JobModel.getJobById(id);
    res.render("applicants", {
      applicants: job.applicants,
      name : req.session.name
    });
  }

  getPostJobPage(req, res) {
    res.render("post-job", {name : req.session.name, title : "Post Job | Easily"});
  }

  postJob(req, res) {
    const jobData = req.body;
    JobModel.addJob(jobData);
    res.render("jobs", {name : req.session.name});
  }

  updateJob(req, res) {
    const { id } = req.body;
  }
}
