import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  jobDesingnation: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  jobSalary: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  jobPostDate: {
    type: String,
    required: true,
  },
  lastDate: {
    type: String,
    required: true,
  },
});

const JobModel = mongoose.model("Job", jobSchema);
export default JobModel;
