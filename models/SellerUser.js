const mongoose = require('mongoose');

const sellerUserSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'seller', 'customer'],
            default: 'customer',
        },
        shopname: {
            type: String,
        },
        shopaddress: {
            type: String,
        },
        district: {
            type: String,
        },
        address: {
            type: String,
        },
        profilePicture: {
            type: String,
        },
        logo: {
            type: String,
        },
        coverPhoto: {
            type: String,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('SellerUser', sellerUserSchema);

module.exports = SellerUser;
