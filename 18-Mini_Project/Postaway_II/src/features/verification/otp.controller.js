import OTPRepository from "./otp.repository.js";
const otpRepository = new OTPRepository();

export default class OTPGenerator {
  //* Generate OTP
  static generateOTP(email) {
    const otp = Math.floor(Math.random() * 1000000);
    otpRepository.storeGeneratedOTP({ email, otp });
    return otp;
  }

  //* Validate OTP
  static async validateOTP(otp, email) {
    const getOTPdata = await otpRepository.validateOTP({ otp, email });
    if (getOTPdata) {
      return {
        success: true,
        msg: "Verified",
      };
    }
    return {
      success: false,
      msg: "Incorrect Otp",
    };
  }
}
