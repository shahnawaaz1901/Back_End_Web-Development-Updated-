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

function removeFile(path) {
  fs.unlink(path);
}

const uploadOnCloudinary = async (filepath) => {
  let response = null;
  try {
    response = await cloudinary.uploader.upload(filepath, {
      resource_type: "raw",
    });
  } catch (error) {
    console.log(error);
  } finally {
    fs.unlink(filepath);
    return response;
  }
};

export default uploadOnCloudinary;
