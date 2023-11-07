const auth = (req, res, next) => {
  console.log(req.session.name)
  if (req.session.name) {
    next();
  } else {
    res.render('login-failed');
  }
};

export default auth;
