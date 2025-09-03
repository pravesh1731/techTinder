const adminAuth = (req, res, next) => {
  const token = "abc";
  const isAdminAuthorized = token === "abc";
  if (!isAdminAuthorized) {
    res.status(401).send("Admin is not authorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "abc";
  const isAdminAuthorized = token === "abc";
  if (!isAdminAuthorized) {
    res.status(401).send("User is not authorized");
  } else {
    next();
  }
};
module.exports = { adminAuth , userAuth};
