const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const registerUser = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    console.log(email, password);

    // if (!email || !password) {
    if (!email) {
        res.status(404);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(404);
        throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password", hashedPassword);

    const user = await User.create({
        email,
        password: hashedPassword,
        role: role,
    });

    console.log(`User created: ${email}`);

    const userData = {
        email: user.email,
    };

    if (user) {
        res.status(201).json({
            message: "User created",
            status: "success",
            data: userData,
        });
    } else {
        res.status(400).json({
            message: "Data is not valid",
            status: "fail",
        });
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("All field are mandatrory")
    }

    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                email: user.email,
                id: user._id,
                role: user.role
            }
        },
            process.env.MY_ACCESS_TOKEN,
            { expiresIn: '5h' }
        )
        res.status(200).json({
            status: "success",
            message: "User matching successfull",
            token: accessToken
        })
    } else {
        res.status(404).json({
            status: "fail"
        })
    }
})

const currentUser = asyncHandler(async (req, res) => {
    res.json({
        data: req.user,
        isAdmin: true
    })
})


const loginAdmin = asyncHandler(async (req, res) => {
    const email = req.query.email;
    console.log(email);

    try {
        const user = await User.findOne({ email: email });
        console.log(user);

        if (user) {
            if (user.role === 'admin') {
                res.json({
                    isAdmin: true,
                    data: user.role,
                    status: "success"
                });
            } else {
                res.json({
                    isAdmin: false,
                    Status: "fail"
                });
            }
        } else {
            res.json({
                status: 'fail',
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});




module.exports = { registerUser, loginUser, currentUser, loginAdmin }