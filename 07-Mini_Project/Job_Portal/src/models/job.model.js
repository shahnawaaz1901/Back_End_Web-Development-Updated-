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
        jobDetail.totalPositions,
      )
    );
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
    "30-October-2023",
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
    "12-November-2023",
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
    "12-November-2023",
    5,
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString()
  ),
];
