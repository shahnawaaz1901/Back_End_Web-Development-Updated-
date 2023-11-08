const auth = (req, res, next) => {
  if (req.session.name) {
    next();
  } else {
    res.render('login-failed');
  }
};

export default auth;
