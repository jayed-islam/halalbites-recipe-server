const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
        },
        role: {
            type: String,
        },
        confirmationToken: String,
        confirmationTokenExpires: Date,
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        name: String,
        phone: String,
        district: String,
        subDistrict: String,
        country: String,
        orderNotes: String,
        postalCode: String,
    },
    {
        timestamps: true,
    }
);

// // Hash the password before saving
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         return next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // Compare passwords
// userSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
