const express = require("express");
const morgan = require("morgan");

const app = express();

// Application-level middleware
app.use(morgan("dev"));

// Route functions
const saySomething = (req, res) => {
  const greeting = req.params.greeting;
  const name = req.query.name;
  const content = greeting && `${greeting}, ${name}!`;
  res.send(content);
};

// Router-level middleware
const checkForAbbreviationLength = (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length > 2) {
    next(`State abbreviation ${abbreviation} is invalid.`);
  } else {
    next();
  }
};

// Routes
app.get("/songs", (req, res) => {
  const title = req.query.title;
  res.send(title);
});
app.get("/say/goodbye", (req, res) => {
  res.send("Sorry to see you go!");
});
app.get("/say/:greeting", saySomething);


app.get(
  "/states/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    res.send(`${req.params.abbreviation} is a nice state, I'd like to visit.`);
  }
);

app.get(
  "/travel/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    res.send(`Enjoy your trip to ${req.params.abbreviation}!`);
  }
);

  // Why not just include a line like the following in the server code?
  // app.use(checkForAbbreviationLength);
  // Because it will match with any routes, such as:
  // http://localhost:5000/random-routes
  // We get TypeError: Cannot read property 'length' of undefined.
  // Because abbreviation requires an URL with a params named `abbreviation`.


// Not-found handler
app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});

module.exports = app;
