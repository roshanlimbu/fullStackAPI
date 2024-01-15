const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8081;
var corsOptions = {
  origin: "https//localhost:8080",
};
// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ msg: "hello from backend" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
