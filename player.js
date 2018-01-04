const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:{
        type: String,
        required: [true, "usernameRequired"],
        maxlength: [32, "tooLong"],
        minlength: [6, "tooShort"],
        match: [/^[a-z0-9]+$/, "usernameIncorrect"],
        unique: true
    },
    password:{
        // Добавить хеширование
        type: String,
        maxlength: [32, "tooLong"],
        minlength: [8, "tooShort"],
        match: [/^[A-Za-z0-9]+$/, "passwordIncorrect"],
        required: [true, "passwordRequired"]
    },
});

module.exports = mongoose.model('PlayerModel', playerSchema);
