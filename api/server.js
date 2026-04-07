const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dental API is running");
});

const routes = require("./routes/appointments");
app.use("/appointments", routes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});