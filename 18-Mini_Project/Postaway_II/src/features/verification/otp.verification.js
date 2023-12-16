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
    return recOTP == this.otp && email == this.otpForEmail;
  }
}
