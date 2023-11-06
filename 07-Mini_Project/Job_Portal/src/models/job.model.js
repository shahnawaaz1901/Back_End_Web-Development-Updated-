class ApplicantModel {
  constructor(_name, _email, _contact, _resume) {
    this.name = _name;
    this.email = _email;
    this.contact = _contact;
    this.resume = _resume;
  }
}

export default class JobModel {
  constructor(
    _id,
    _companyName,
    _jobType,
    _post,
    _location,
    _salaryRange,
    _skills,
    _deadline,
    _numOpenings,
    _jobPostDate,
    _jobPostTime
  ) {
    this.id = _id;
    this.companyName = _companyName;
    this.jobType = _jobType;
    this.post = _post;
    this.salaryRange = _salaryRange;
    this.location = _location;
    this.skills = _skills;
    this.deadline = _deadline;
    this.numOpenings = _numOpenings;
    this.applicants = [];
    this.jobPostDate = new Date().toLocaleDateString();
    this.jobPostTime = new Date().toLocaleTimeString();
  }
  static getJobData() {
    return jobDetails;
  }

  static getJobById(id) {
    const jobData = jobDetails.find((job) => job.id == id);
    return jobData;
  }

  static addApplicants(applicantDetail) {
    for (let everyJob of jobDetails) {
      if (everyJob.id == applicantDetail.id) {
        everyJob.applicants.push(
          new ApplicantModel(
            applicantDetail.name,
            applicantDetail.email,
            applicantDetail.contact,
            applicantDetail.resume
          )
        );
        break;
      }
    }
  }

  static addJob(jobDetail) {
    jobDetails.push(
      new JobModel(
        jobDetails.length + 1,
        jobDetail.companyName,
        jobDetail.jobType,
        jobDetail.jobDesingnation,
        jobDetail.jobLocation,
        jobDetail.jobSalary,
        jobDetail.skills,
        jobDetail.date,
        jobDetail.totalPositions
      )
    );
  }

  static updateJob(updatedJob) {
    const jobIndex = jobDetails.findIndex((j) => j.id == updatedJob.id);
    if (jobIndex == -1) {
      return;
    }
    jobDetails[jobIndex] = new JobModel(
      updatedJob.id,
      updatedJob.companyName,
      updatedJob.jobType,
      updatedJob.jobDesingnation,
      updatedJob.jobLocation,
      updatedJob.jobSalary,
      updatedJob.skills,
      updatedJob.date,
      updatedJob.totalPositions,
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    );
  }

  removeJob(id) {
    const index = jobDetails.findIndex((j) => j.id == id);
    if (index == -1) {
      return;
    }
    jobDetails.splice(index, 1);
  }
}

var jobDetails = [
  new JobModel(
    1,
    "Coding Ninjas",
    "Tech",
    "SDE",
    "Gurgao HR IND Remote",
    "14 - 20 LPA",
    ["React", "Node.Js", "JS", "SQL", "MongoDB", "Express", "AWS"],
    "2023-10-30",
    6,
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString()
  ),
  new JobModel(
    2,
    "Go Digit",
    "Tech",
    "Angular Developer",
    "Pune IND On-Site",
    "6 - 10 LPA",
    ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
    "2023-11-12",
    5,
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString()
  ),
  new JobModel(
    3,
    "Juspay",
    "Tech",
    "SDE",
    "Bangalore IND",
    "6 - 10 LPA",
    ["React", "Node.Js", "JS", "SQL", "MongoDB", "Express", " AWS"],
    "2023-11-30",
    5,
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString()
  ),
];
