export default class OTPGenerator {
  static otp;
  static generateOTP() {
    this.otp = Math.floor(Math.random() * 1000000);
    return this.otp;
  }

  static getOTP() {
    return this.otp;
  }

  static validateOTP(recOTP) {
    return recOTP == this.otp;
  }
}
