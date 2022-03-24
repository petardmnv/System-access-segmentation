const bcrypt = require('bcrypt');
const AppError = require('../../utils/appError.js');
module.exports = {
    comparePassword: async (plainPassword, hashedPassword) => {
        // compare passwwords
        let isValid = await bcrypt.compare(plainPassword, hashedPassword);
        if (!isValid) {
            throw new AppError("Unable to login.", 401);
        }
    }
};