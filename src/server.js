const { PORT = 8080 } = process.env;

const app = require("./app");

app.listen(PORT, () => console.log(`Going on Port ${PORT}!`));
