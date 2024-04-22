import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
const configDetail = {
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
};

cloudinary.config(configDetail);

const uploadOnCloudinary = async (filepath) => {
  try {
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "raw",
    });
    console.log(filepath);
    console.log(path.resolve());
    fs.unlinkSync(filepath);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(filepath);
    return null;
  }
};

export default uploadOnCloudinary;
