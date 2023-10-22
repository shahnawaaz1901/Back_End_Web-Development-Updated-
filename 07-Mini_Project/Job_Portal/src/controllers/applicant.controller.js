import ApplicantsModel from "../models/applicants.model.js";
import path from 'path';
export default class ApplicantController{
    addNewApplicant(req, res){
        const {name, email, contact} = req.body;
        const resume = path.join("public","data") + req.file.filename;
        ApplicantsModel.addApplicantInfo(name, email, contact, resume);
        res.redirect("/jobs");
    }
}

var applicantsInfo = [];