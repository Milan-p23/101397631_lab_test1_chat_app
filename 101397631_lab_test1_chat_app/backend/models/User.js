const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters"],
        trim: true,
        lowercase: true  
    },
    firstname: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    if (this.password.length < 8) {
        return next(new Error("Password must be at least 8 characters long"));
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);
