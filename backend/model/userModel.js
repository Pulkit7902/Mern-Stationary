const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Assuming name is a required field
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,  // Assuming password is a required field
    },
    profilepic: {
        type: String,
        default: ''  // Default value if profilepic is not provided
    },
    role: {
        type: String,
        default: 'user'  // Default role is 'user'
    },
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
