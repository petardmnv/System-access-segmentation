const express = require('express');
const app = express();

const { globalErrorHandler } = require('./controllers/error/errorController.js');
const AppError = require('./utils/appError.js');
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

module.exports = app;