var jwt = require("jsonwebtoken");
const jwtSecret = "NezukoChanTanjiro@1234567890@Inosuke";
const fetch = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Invalid Auth Token 1" });
  }
  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid Auth Token" });
  }
};
module.exports = fetch;
