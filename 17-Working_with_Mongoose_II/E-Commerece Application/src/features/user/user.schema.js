import mongoose from "mongoose";

/* 
  Mongoose Provide us Different Type of Validations for Different type of 
  Data like for string minLength and maxLength, uppercase or lowercase and
  for numbers min and max number for get the number inside the range
*/
export const userSchema = new mongoose.Schema({
  //* We Specify Fields Require and corresponding the type of name
  name: {
    type: String, //* Type of the Name
    /* 
      minLength takes array that contains first is the validation and if 
      validation false then we need to pass a string which will show if
      validation is failed
    */
    maxLength: [25, "Name Can't be Greater then 25 Characters"],
  },
  email: {
    type: String,
    unique: true, // Means We want to Keep email as unique
    required: true, // required Attribute true means this field is mendatory
    //* match attribute matches the value of email which user provide with the expression which we provide
    /* 
      for specify expression we need to write expression between /../ slash
      dot. 
      Plus and backslash(+\) specify that some content and after that @ and
      after @ some content like provider name after name a dot . and after
      dot a domain name, this is the epxression of an email.
      Next Element of the match array is the string which will show if validation
      is failed.
    */
    match: [/.+\@.+\../],
  },
  password: {
    type: String,
    /*
    validate: {
      validator: function (value) {
        
          We specify custom validator given expression means that the 
          password contains special characters first but after end of 
          the square and normal bracket. In the next square bracket it
          defines that a capital and small latter character needs to
          involve in the password and next curly braces defines the min
          and max length of the password. and test function takes value 
          in the argument which is password entered by the user. test 
          function runs the user given password with the expression.
        
        return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
      },
      
        message attribute takes string which will shown if regular expression 
        failes in validation then this message displayed  
        message:
        "Password Should be 8 to 12 Character and have special character ",
      },
      */
  },
  /* 
        We have two type of account first is for user and another one is for seller
        so we can use enums to specify the type of account. 
        Now question is what is enum, enum is use to specifies the value from of the
        fields in an array 
    */
  typeOfAccount: {
    type: String,
    /* 
        What Ever Account type we have we can specified in enum so that user has two 
        options of account type one is as a customer and another one as Seller 
    */
    enum: ["Customer", "Seller"],
  },
});
