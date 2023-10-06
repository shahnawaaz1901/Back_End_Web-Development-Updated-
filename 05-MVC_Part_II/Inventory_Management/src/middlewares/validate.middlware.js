// 1. Import express-validator objects
import { body, validationResult } from "express-validator";
/*
    Body object takes all input field which is given by the user and 
    validationResult object stores information about validation
*/
/* 
    Export default keyword works at the time of initialization only on
    hoisted variable or functions
*/
const validateRequest = async (req, res, next) => {
  /*
    Rules for Validate the Request
        1. Import body and validattionResult from the express-validator
        2. Create some Rules for Validating
        3. Run everyRule on Request to check Errors
        4. Return the Error
    */
  //2.Create Rules
  const Rules = [
    body("name").notEmpty().withMessage("Name is Required !"), // Check Name is Empty or Not
    body("price").isFloat({ gt: 0 }).withMessage("Price is Invalid"), // Check Number is Greater then 0 or not
    body("imageURL").isEmpty().withMessage("URL is Not Valid"), // Check URL is Valid or Not
  ];

  //3.Run Every Rule on Request for Error.Validation can be asynchronous Operation that's why async await
  await Promise.all(Rules.map((rule) => rule.run(req)));          // Run Rule for Request Which is Received

  //4.Check Error is Found or Not for request
  let errors = validationResult(req).array();
  /* Instead of this Use express-validator
        if(!name || name.trim() == ''){
            errors.push("Enter a Valid Name of Product");
        }
        if(price < 1){
            errors.push("Price You Entered is Invalid");
        }
        try {
            let url = new URL(imageURL);
        } catch (error) {
            errors.push("Enter a Valid URL");
        }
    */
  if (errors.length > 0) {
    return res.render("new-product", {
      errorMassages: errors,
      title: "Add New Product",
    });
  }
  next();
};

// You can export deault after initialization for every non hoisted variable or functions
export default validateRequest;
