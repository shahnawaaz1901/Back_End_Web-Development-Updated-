import JobModel from "../models/job.model.js";
import path from "path";
import sendNotification from "../../nodemailer.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

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
    // res.writeHead(200,{'content-type':'text/css'});
    res.render("job-description", {
      "content-type": "text/css",
      title: "Job Description | Easily",
      job: jobData,
      name: req.session.name,
    });
  }

  async addJobApplicant(req, res) {
    const { id, name, email, contact } = req.body;
    // console.log(req.file);
    const data = await uploadOnCloudinary(req.file.path);
    console.log(data);
    const resume = req.file.filename;
    const obj = {
      id,
      name,
      email,
      contact,
      resume,
    };
    JobModel.addApplicants(obj);
    sendNotification(email, "jobApply");
    res.render("jobs", {
      title: "Job Description | Easily",
      name: req.session.name,
      jobs: JobModel.getJobData(),
    });
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
      errors: null,
    });
  }

  postJob(req, res) {
    const jobData = req.body;
    //* Check if Skills is Array or String
    /* One Way to Check Array or Not
      if (req.body.skills.contructor != Array) {
        req.body.skills = req.body.skills.split(",");
      }
    */

    //* Second Way to Check Array or Not
    if (!Array.isArray(req.body.skills)) {
      req.body.skills = req.body.skills.split(",");
    }

    JobModel.addJob(jobData);
    const jobs = JobModel.getJobData();

    res.render("jobs", {
      title: "Jobs | Easily",
      message: "No Jobs Available",
      name: req.session.name,
      jobs,
    });
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
