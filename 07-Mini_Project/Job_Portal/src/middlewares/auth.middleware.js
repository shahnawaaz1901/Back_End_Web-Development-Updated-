const auth = (req, res) => {
  if (req.session.userEmail) {
    next();
  } else {
    res.render('login-failed');
  }
};

export default auth;
