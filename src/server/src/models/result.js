const mongoose = require("mongoose");

// Create model which has its data schema for Pipelines Result information in the site
const resultSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        validate(value) {
            if (!value) {
                throw new Error('Role is invalid');
            }
        }
    },
    privileges: {
        type: Array,
        required: true,
    }
});

const Result = mongoose.model(
    "Result", resultSchema
);
module.exports = Result;