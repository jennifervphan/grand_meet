const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    about: {
        type: String,
        default: ""
    },
    profilePicUrl: String,
    profilePicName: String,
    longitude: Number,
    latitude: Number
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;