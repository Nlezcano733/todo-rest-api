const express = require("express");
const morgan = require("morgan");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Routes import
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");
const projectRouter = require("./routes/project");

// Initialization
const app = express();
require("./db/database");

// Settings
app.set("port", process.env.PORT || 4000);
// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/project", projectRouter);

// Start
app.listen(app.get("port"), () => {
  console.log("Serve listen port " + app.get("port"));
});
