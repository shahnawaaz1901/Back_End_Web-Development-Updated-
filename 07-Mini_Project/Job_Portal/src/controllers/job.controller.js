import JobModel from "../models/job.model.js";
import path from "path";

export default class JobController {
  getHomePage(req, res) {
    res.render("index", {
      title: "Job Portal | Easily",
      name: req.session.name,
    });
  }

  getJobPage(req, res) {
    let jobs = JobModel.getJobData();
    res.render("jobs", {
      title: "Jobs | Easily",
      name: req.session.name,
      message: "No Jobs Available",
      jobs,
    });
  }

  getJobDescription(req, res) {
    const id = req.params.id;
    const jobData = JobModel.getJobById(id);
    res.render("job-description", {
      title: "Job Description | Easily",
      job: jobData,
      name: req.session.name,
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
    res.render("jobs", { name: req.session.name, jobs: JobModel.getJobData() });
  }

  getJobApplicants(req, res) {
    const id = req.params.id;
    const job = JobModel.getJobById(id);
    res.render("applicants", {
      title: "Applicant Details | Easily",
      applicants: job.applicants,
      name: req.session.name,
    });
  }

  getPostJobPage(req, res) {
    res.render("post-job", {
      title: "Post Job | Easily",
      name: req.session.name,
    });
  }

  postJob(req, res) {
    const jobData = req.body;
    JobModel.addJob(jobData);
    const jobs = JobModel.getJobData();
    res.render("jobs", { name: req.session.name, jobs });
  }

  getUpdateJobPage(req, res) {
    const { id } = req.params;
    const job = JobModel.getJobById(id);
    if (job) {
      res.render("update-job", {
        title: "Update Job | Easily",
        name: req.session.name,
        job,
      });
    } else {
      res.send("Job Not Found !!");
    }
  }

  postUpdateJob(req, res) {
    JobModel.updateJob(req.body);
    const jobs = JobModel.getJobData();
    res.render("jobs", {
      title: "Jobs | Easily",
      name: req.session.name,
      jobs,
    });
  }

  searchJob(req, res) {
    const word = req.body.searchKeyword;
    const searchResult = JobModel.search(word);
    res.render("jobs", {
      title: "Search Result | Easily",
      name: req.session.name,
      jobs: searchResult,
      message: "No Job Found !!",
    });
  }

  deleteJob(req, res) {
    const { id } = req.params;
    JobModel.removeJob(id);
    const jobs = JobModel.getJobData();
    res.render("jobs", {
      title: "Jobs | Easily",
      name: req.session.name,
      jobs,
    });
  }
}
