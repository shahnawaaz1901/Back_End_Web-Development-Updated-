import OTPModel from "./opt.schema.js";

export default class OTPRepository {
  async storeGeneratedOTP(obj) {
    try {
      const newOTP = new OTPModel({ email: obj.email, otp: obj.otp });
      await newOTP.save();
    } catch (error) {
      throw error;
    }
  }

  async validateOTP(obj) {
    try {
      const getOTP = await OTPModel.deleteOne(obj);
      return getOTP.deletedCount;
    } catch (error) {
      throw error;
    }
  }
}
