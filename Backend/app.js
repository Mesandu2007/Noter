const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5174", // Adjust to your frontend port
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

require("./config/passport");

// Health check route to verify connectivity
app.get("/", (req, res) => res.send("API is running..."));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT} and MongoDB Connected`)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();