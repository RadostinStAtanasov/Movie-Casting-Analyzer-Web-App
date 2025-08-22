const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routers/router");

const app = express();

app.get("/", (req, res) => {
  res.send("Home Page ready!!!!!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
