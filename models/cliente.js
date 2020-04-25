const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const scheme = new Schema({
    nombres: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
},{ timestamps: true });

module.exports = mongoose.model('clients', scheme);