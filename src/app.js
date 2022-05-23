const express = require("express");
const morgan = require("morgan");

const app = express();

function sayHello(req, res, next) {
  res.send("Hello!");
}

app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("Home Page");
  res.send("Home Page");
});

app.get("/users", (req, res) => {
  res.send("Users Page");
});

// const logging = (req, res, next) => {
//   console.log("A request is being made !");
//   next();
// };
// app.use(logging);

app.use(sayHello);

module.exports = app;
