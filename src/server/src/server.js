const { port } = require('./config/index.js');
const express = require('express');
const mongoose = require("mongoose");
const app = express();

const { globalErrorHandler } = require('./controllers/error/errorController.js');
const AppError = require('./utils/appError.js');

const { createConnection } = require('./models/connect.js');
createConnection(mongoose);

// event listener for errors
mongoose.connection.on("error", function (error) {
  console.log(`Error: ${error}`);
});

const authRouter = require('./routes/auth/auth.js');

app.use(express.json());

app.use('/', authRouter);

// Handler for all invalid server urls
app.all('*', (req, res, next) => {
  // pass the error to next(). If an error occurs in the next parameter all other middleware func are
  // skipped and the error is handled by the global middleware error handler 
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

// set port who listens for requests
const PORT = port || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});