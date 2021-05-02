const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Route files
const bootcamps = require("./routes/bootcamps");

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 8800;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
