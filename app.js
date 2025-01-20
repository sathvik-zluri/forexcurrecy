const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ratesRoutes = require("./routes/rates");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/v1/ratesininr", ratesRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Exchange Rate API");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
