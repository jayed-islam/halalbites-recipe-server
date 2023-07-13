const mongoose = require("mongoose");
const validator = require("validator");

const sellerSchema = mongoose.Schema(
    {
        profilePicture: {
            type: String,
            required: [true, "Profile picture is required"],
        },
        fname: {
            type: String,
            required: [true, "First name is required"],
        },
        lname: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            validate: {
                validator: validator.isEmail,
                message: "Invalid email address",
            },
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
        district: {
            type: String,
            required: [true, "District is required"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        shopInfo: {
            shopname: {
                type: String,
                required: [true, "Shop name is required"],
            },
            shopaddress: {
                type: String,
                required: [true, "Shop address is required"],
            },
            logo: {
                type: String,
                required: [true, "Logo is required"],
            },
            coverPhoto: {
                type: String,
                required: [true, "Cover photo is required"],
            },
        },
        role: {
            type: String,
            required: [true, "Role is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Seller = mongoose.model("sellerSchema", sellerSchema);
module.exports = Seller;
