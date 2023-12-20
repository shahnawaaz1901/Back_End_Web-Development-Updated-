import path from "path";
const filePath = (req, res, next) => {
  if (req.url.includes("createPost") || req.url.includes("updatePost")) {
    req.filePath = path.join("public", "images", "posts");
  } else if (req.path.includes("signUp")) {
    req.filePath = path.join("public", "images", "profile");
  }
  next();
};

export default filePath;
