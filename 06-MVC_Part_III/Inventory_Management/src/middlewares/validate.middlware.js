// 1. Import express-validator objects
import { body, validationResult } from "express-validator";

const validateRequest = async (req, res, next) => {
  console.log(req.body);
  //2.Create rules
  const rules = [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage(
        'Price should be a positive value'
      ),
    body('imageURL')
      .isURL()
      .withMessage('URL is Invalid'),
  ];

  //3.Run Every Rule on Request for Error.Validation can be asynchronous Operation that's why async await
  await Promise.all(rules.map((rule) => rule.run(req)));          // Run Rule for Request Which is Received

  //4.Check Error is Found or Not for request
  let errors = validationResult(req).array();

  if (errors.length > 0) {
    return res.render("new-product", {
      errorMassages: errors,
      title: "Add New Product",
    });
  }
  next();
};

export default validateRequest;
