const express = require("express");
const morgan = require("morgan");

const app = express();

// Application-level middleware
app.use(morgan("dev"));

// Route functions
function sayHello(req, res, next) {
  res.send("Hello!");
}

const sayHi = (req, res) => {
  // console.log(req.query);
  const name = req.query.name;
  const content = name ? `Hello, ${name}!` : " Hello!";
  res.send(content);
};

const saySomething = (req, res) => {
  // console.log(req.params);
  const greeting = req.params.greeting;
  const name = req.query.name;
  const content = greeting && `${greeting}, ${name}!`;
  res.send(content);
};

// Route functions
app.get("/", (req, res) => {
  console.log("Home Page");
  res.send("Home Page");
});

app.get("/users", (req, res) => {
  console.log("Users Page");
  res.send("Users Page");
});

app.get("/songs", (req, res) => {
  const title = req.query.title;
  res.send(title);
});
  // const logging = (req, res, next) => {
  //   console.log("A request is being made !");
  //   next();
  // };
  // app.use(logging);

  // app.use(sayHello);

app.get("/hello", sayHello);
app.get("/hi", sayHi);
app.get("/say/goodbye", (req, res) => {
  res.send("Sorry to see you go!");
});
app.get("/say/:greeting", saySomething);


module.exports = app;
