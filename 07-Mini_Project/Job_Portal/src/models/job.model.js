export default class JobModel {
  constructor(_id, _companyName,_jobType,_post, _salaryRange,_location,_skills,_deadline,_numOpenings) {
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

  }
}
