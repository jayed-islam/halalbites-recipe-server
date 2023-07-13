import Seller from "../models/Sellers";
const asyncHandler = require('express-async-handler')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const createSellerAccount = asyncHandler(async (req, res) => {
    const {
        profilePicture,
        fname,
        lname,
        email,
        address,
        district,
        phone,
        password,
        shopInfo: { shopname, shopaddress, logo, coverPhoto },
    } = req.body;

    // Check if email is already registered
    const userExists = await Seller.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("Email is already registered");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the seller account
    const seller = await Seller.create({
        profilePicture,
        fname,
        lname,
        email,
        address,
        district,
        phone,
        password: hashedPassword,
        shopInfo: {
            shopname,
            shopaddress,
            logo,
            coverPhoto,
        },
        role: "seller",
    });

    const sellerInfo = {
        email: seller.email
    }
    res.status(201).json({
        message: "Seller account created successfully",
        status: "success",
        data: sellerInfo,
    });
});


module.exports = { createSellerAccount };