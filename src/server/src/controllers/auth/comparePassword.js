const bcrypt = require('bcrypt');

module.exports = {
    comparePassword: async (plainPassword, hashedPassword) => {
        // compare passwwords
        let isValid = await bcrypt.compare(plainPassword, hashedPassword);

        if (!isValid) {
            throw new Error("Unable to login.");
        }
    }
};