export default class Applicants{
    constructor(_name, _email, _contact,_resume){
        this.name = _name; 
        this.email = _emaill
        this.contact = _contact;
        this.resume = _resume;
    }

    static addApplicantInfo(name, email, contact, resume){
        applicantsInformation.push(new Applicants(name, email, contact, resume));
    }
}

var applicantsInformation = [];