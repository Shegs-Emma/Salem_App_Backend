const mongoose          = require('mongoose'),
    uniqueValidator     = require('mongoose-unique-validator');

//Installed the mongoose-unique-validator to allow validation before saving to the database
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);