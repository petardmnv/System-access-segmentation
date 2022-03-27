module.exports = {
    globalErrorHandler: (err, req, res, next) => {
        // Set resp status code from err.statusCode or set default = 500
        err.statusCode = err.statusCode || 500;
        
        //send response with proveded  status and message
        res.status(err.statusCode).send({
          message: err.message,
          stack: err.stack
        });
    }
};