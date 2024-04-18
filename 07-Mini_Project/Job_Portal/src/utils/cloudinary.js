import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
const configDetail = {
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
};
cloudinary.config(configDetail);

const uploadOnCloudinary = async (filepath) => {
  console.log(configDetail);
  try {
    console.log(filepath);
    const response = await cloudinary.uploader.upload(
      "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      {
        resource_type: "auto",
      }
    );
    console.log("Inside");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(filepath);
    return null;
  }
};

export default uploadOnCloudinary;
