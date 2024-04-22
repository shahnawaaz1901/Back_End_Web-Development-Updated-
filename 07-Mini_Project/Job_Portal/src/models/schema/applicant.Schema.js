import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

const ApplicantModel = mongoose.model("Applicant", applicantSchema);
export default ApplicantModel;
