const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/dbConnect");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const categoryRoutes = require("./routes/categories");
const { ApiError } = require("./utils/ApiError");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public"));

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1", authRoutes.router);
app.use("/api/v1", taskRoutes.router);
app.use("/api/v1", categoryRoutes.router);

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    console.error("API Error:", err);
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  } else {
    console.error("Internal Server Error:", err);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: err.message,
      stack: err.stack,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
