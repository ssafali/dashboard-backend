// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const { isAuthenticated } = require("./middleware/jwt.middleware");
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Handling routes here

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes, isAuthenticated);

// Routes for the dashboard content
const toDoRouter = require("./routes/toDo.routes")
app.use("/", toDoRouter, isAuthenticated)

const notesRouter = require("./routes/notes.routes");
app.use("/", notesRouter, isAuthenticated)

const userRouter = require('./routes/user.routes')
app.use('/', userRouter, isAuthenticated)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
