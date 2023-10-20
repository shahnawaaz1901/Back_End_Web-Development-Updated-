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
    this.numApplicants = 1;
    this.jobPostDate = _jobPostDate;
    this.jobPostTime = _jobPostTime;
  }
  static getJobData() {
    return jobDetails;
  }

  static getJobById(id) {
    const jobData = jobDetails.find((job) => job.id == id);
    return jobData;
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
    5,
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString(),
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
    6,
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString(),
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
    new Date().toLocaleTimeString(),
  ),
];
