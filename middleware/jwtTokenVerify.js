const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const token = authHeader.substring(7);

  try {
    const { email, userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { email, userId };
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: err });
  }
}

module.exports = authenticateJWT;
