export default class ApplicantsModel{
    constructor(_name, _email, _contact,_resume){
        this.name = _name; 
        this.email = _email;
        this.contact = _contact;
        this.resume = _resume;
    }

    static addApplicantInfo(name, email, contact, resume){
        applicantsDetails.push(new ApplicantsModel(name, email, contact, resume));
    }

    static getApplicantsInfo(){
        return applicantsDetails;
    }
}

var applicantsDetails = [];