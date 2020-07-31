const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var orgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Organization Name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    contact: {
        type: Number,
        required: 'Contact can\'t be empty'
    },
    address: {
        type: String,
        required: 'Address Name can\'t be empty'
    },
    isActive: {
        type: Number,
        default: 1
    },
    status: {
        type: Number
    }
},
{ 
    timestamps: true
});

// Custom validation for email
orgSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


module.exports = mongoose.model('Organization', orgSchema);