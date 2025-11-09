const authorizeAdmin = (req, res, next) => {
  if (req.session && req.session.user === "admin") {
    console.log("authorized");
    next();
  } else {
    res.redirect("/login");
  }
};

const authorizeUser = (req, res, next) => {
  if (req.session && req.session.user === "user") {
    console.log("authorized");
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = { authorizeAdmin, authorizeUser };
