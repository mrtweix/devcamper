const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// route files
const bootcamps = require("./routes/bootcamps");

// Load env variable
dotenv.config();

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// middlewares
// app.use(express.json());

// mount routes
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 8800;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
