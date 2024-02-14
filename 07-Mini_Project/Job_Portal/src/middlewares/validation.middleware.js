import { body, validationResult } from "express-validator";

/*
    body object from express-validator reffers to our req.body and validationResult 
    is the object which contains the Errors after validating the req.body
*/

const jobValidation = async (req, res, next) => {
  // Setup Rules Validation
  console.log(req.body);
  const rules = [
    body("companyName").notEmpty().withMessage("Company Name is Required"),
    body("jobType").notEmpty().withMessage("Job Type is Required"),
    body("jobDesingnation")
      .notEmpty()
      .withMessage("Job Desingnation is Required"),
    body("jobLocation").notEmpty().withMessage("Job Location is Required"),
    body("jobSalary").notEmpty().withMessage("Job Salary is Required"),
    body("totalPositions")
      .notEmpty()
      .withMessage("Number of Openings is Required"),
    body("skills").notEmpty().withMessage("Minimum One Skill is Required"),
  ];
  // Run those Rules
  /* 
    Promise.all() Function wait until All Elements of Array Promise is fulfiled
    or rejected means we can say Promise.all() function runs promise on every
    and each element of array and returns the resolve or reject state for each
    and every element
  */
  /*
    run function runs the setOf Rules on the gives request and populate the result
    of validation into the validationResult array, validationResult is a function of
    errors which returns the Array of Errors after passing the request to that 
    function
  */
  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req).array();
  if (validationErrors.length > 0) {
    return res.render("post-job", {
      title: "Post Job | Easily",
      name: req.session.name,
      errors: validationErrors[0],
    });
  }
  next();
};

export default jobValidation;
