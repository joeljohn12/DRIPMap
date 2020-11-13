const mongoose = require('mongoose');

const userDataModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 256
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024 
    }
});

module.exports = mongoose.model('userDataModel', userDataModel);
