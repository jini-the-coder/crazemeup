const express = require("express");
const app = express();
const port = 5000;

const mongoDB = require("./db");
mongoDB();

// For CORS policy issue
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, auth-token"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
  if (req.method === "OPTIONS") {
    // Handle preflight requests
    res.sendStatus(200);
  } else {
    next();
  }
});

////

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
