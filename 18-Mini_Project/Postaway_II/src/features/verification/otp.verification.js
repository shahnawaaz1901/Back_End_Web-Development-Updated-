export default class OTPGenerator {
  //* otp member
  static otp;

  //* email member so that we can verify that otp is sent for this email
  static otpForEmail;

  static generateOTP(email) {
    this.otp = Math.floor(Math.random() * 1000000);
    this.otpForEmail = email;
    console.log(this.otp, this.otpForEmail);
    return this.otp;
  }

  static validateOTP(recOTP, email) {
    console.log(recOTP, email);
    if (email != this.otpForEmail) {
      return {
        success: false,
        msg: "Please Generate OTP first",
      };
    }
    if (recOTP == this.otp && email == this.otpForEmail) {
      return {
        success: true,
        msg: "Verified",
      };
    }
    return {
      success: false,
      msg: "Otp is Incorrect",
    };
  }
}
