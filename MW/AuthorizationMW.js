const jwt = require("jsonwebtoken");

module.exports.auth = (req, res, next) => {
  try{
    const token = req.get("Authorization").split(" ")[1];
  }catch{
    throw new Error("not Authenticated");
    
  }
  console.log(token);
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization failed" });
  } else {
    const decoded = jwt.verify(token, "secretkey");
    req.decoded.role = decoded.role;
  }
};


module.exports.isAdmin = (req, res, next) => {
  if (req.decoded.role === "Admin") {
    next();
  } else {
    return res.status(401).json({ msg: "You are not authorized" });
  }
};

module.exports.isTeacher = (req, res, next) => {
  if (req.decoded.role === "Teacher") {
    next();
  } else {
    return res.status(401).json({ msg: "You are not authorized" });
  }
};

module.exports.isAdminOrisTeacher = (req, res, next) => {
  if (req.decoded.role === "Admin" || req.decoded.role === "Teacher") {
    next();
  } else{
    return res.status(401).json({ msg: "You are not authorized" });
  }}