const mongoose = require("mongoose");
const validator = require('validator');

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate(value) {
            if (!value) {
                throw new Error('Model name is invalid');
            }
        }
    },
    description: {
        type: String,
        trim: true
    }
});

const Model = mongoose.model(
    "Model", modelSchema
);

module.exports = Model;