import path from "path";
const filePath = (req, res, next) => {
  //* Check if Image which is Uploaded for Posts or Profile
  /* 
    If Image uploaded for Profile then Store in public/images/profile and if 
    for Posts then public/images/posts 
  */
  if (req.url.includes("createPost") || req.url.includes("updatePost")) {
    req.filePath = path.join("public", "images", "posts");
  } else if (req.path.includes("signUp")) {
    req.filePath = path.join("public", "images", "profile");
  }
  next();
};

export default filePath;
