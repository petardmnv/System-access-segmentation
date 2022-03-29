const express = require('express');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const app = express();


const { globalErrorHandler } = require('./controllers/error/errorController.js');
const AppError = require('./utils/appError.js');
const authRouter = require('./routes/auth/authRouter.js');
const modelRouter = require('./routes/model/modelRouter.js');
const pipelineRouter = require('./routes/pipeline/pipelineRouter.js');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

// Set security HTTP headers
app.use(helmet());

// Mongo sanitize prevents request from NoSQL query injections
app.use(mongoSanitize());

// XSS cleaner prevent request from malicious code parsed into request
app.use(xss());

// Body parser. Reading data from request body into req.body
app.use(express.json());

// Add cookie parser. Readingdata from request cookie to req.cookie
app.use(cookieParser());

// Use cors
app.use(cors())

app.use('/', authRouter);
app.use('/', modelRouter);
app.use('/', pipelineRouter);

// Handler for all invalid server urls
app.all('*', (req, res, next) => {
  // pass the error to next(). If an error occurs in the next parameter all other middleware func are
  // skipped and the error is handled by the global middleware error handler 
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;