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

  addJobApplicant(req, res) {
    const {id, name, email, contact} = req.body;
    const resume = path.join("public","data",req.file.filename);
    const obj = {
      id,
      name,
      email,
      contact,
      resume,
    }
    JobModel.addApplicants(obj);
    res.redirect('back');
  }

  getJobApplicants(req, res){
    const id = req.params.id;
    const job = JobModel.getJobById(id);
    res.render('applicants',{
      applicants : job.applicants
    })
  }

  getPostJobPage(req, res){
    res.render('post-job');
  }

  postJob(req, res){
    const jobData = req.body;
    JobModel.addJob(jobData);
    res.redirect('/jobs');
  }
}