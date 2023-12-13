const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, minLength: 5, maxLength: 50 },
    description: { type: String, maxLength: 450 },
    image: { type: String, maxLength: 350 },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', Course);