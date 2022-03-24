class AppError extends Error {
    constructor(message, statusCode) {
        // call parent class constructor to set message
        super(message);

        this.statusCode = statusCode;

        // Basicly I am setting this parameter so that I can distinguish which error is 'mine'
        // and which error occurred unexpectedly
        // Most useful in production environment, because you can send a generic err message is value = false
        this.isControlled = true;
    }
}
module.exports = AppError;