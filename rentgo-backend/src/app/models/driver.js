const mongoose = require('../../database/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const driverSchema = new mongoose.Schema({
    
    fullname: {
        type: String,
        required: true
    },

    mobile_phone: {
        type: String,
        required: true
    },

    cnh: {
        type: String,
        required: true
    },

    cnh_image: {
        type: String,
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

driverSchema.pre('save', async function hashPassword(next) {
    if(!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password, 10);
});

driverSchema.methods = {
    compareHash(password) {
        return bcrypt.compare(password, this.password);
    }
};

driverSchema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.ttl
        });
    }
};

const driver = mongoose.model('driver', driverSchema);
module.exports = driver;