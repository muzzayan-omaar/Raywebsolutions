const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

app.use(
  "/api/payment/webhook",
  require("./routes/webhook") // register webhook route
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
require("./config/db")();

// Routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/newsletter", require("./routes/newsletter"));
app.use("/api/payment", require("./routes/payment"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
