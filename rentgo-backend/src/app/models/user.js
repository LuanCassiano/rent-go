const mongoose = require('../../database/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const userSchema = new mongoose.Schema({
    
    fullname: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    mobile_phone: {
        type: String,
        required: true
    },

    profile_image: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function hashPassword(next) {
    if(!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    compareHash(password) {
        return bcrypt.compare(password, this.password);
    }
};

userSchema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.ttl
        });
    }
};

const user = mongoose.model('user', userSchema);
module.exports = user;