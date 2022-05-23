const express = require("express");
const morgan = require("morgan");

const app = express();

app.get("/", (req, res) => {
  console.log("Home Page");
  res.send("Home Page");
});

app.get("/users", (req, res) => {
  res.send("Users Page");
});

function sayHello(req, res, next) {
  res.send("Hello!");
}

// const logging = (req, res, next) => {
//   console.log("A request is being made !");
//   next();
// };
// app.use(logging);

app.use(morgan("dev"));
app.use(sayHello);

module.exports = app;
