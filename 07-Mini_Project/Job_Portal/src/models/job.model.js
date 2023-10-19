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
    _numOpenings
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
  }
  getJobData() {
    return jobDetails;
  }
}

var jobDetails = [
  new JobModel(
    jobDetails.length + 1,
    "Coding Ninjas",
    "Tech",
    "SDE",
    "Gurgao HR IND Remote",
    "14 - 20 LPA",
    ["Angular", "React", "Node.Js", "ExpressJs", "MongoDB", "AWS"],
    "30-October-2023",
    5
  ),
  new JobModel(
    jobDetails.length + 1,
    "Go Digit",
    "Tech",
    "Angular Developer",
    "Pune IND On-Site",
    "6 - 10 LPA",
    ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
    "12-November-2023",
    6
  ),
];
