const bcrypt = require('bcrypt');
const AppError = require('../../utils/appError.js');
module.exports = {
    comparePassword: async (plainPassword, hashedPassword) => {
        // compare passwwords
        let isValid = await bcrypt.compare(plainPassword, hashedPassword);
        if (!isValid) {
            throw new AppError("Invalid password.", 401);
        }
    }
};