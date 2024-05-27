const User = require("../models/User");
const { createUserIntoDB } = require("../services/user.service");

const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const userData = req.body;

  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).json({
        success: true,
        message: "User already exists",
        token: token,
      });
    }

    const result = await createUserIntoDB(userData);

    const token = jwt.sign(
      { userId: result._id, email: result.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: result,
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, user, message: "User found Successfully!!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const purchaseCoins = async (req, res) => {
  const { userId, coinsPackage } = req.body;
  try {
    console.log(purchaseCoins, userId);
    if (coinsPackage) {
      const result = await User.findByIdAndUpdate(userId, {
        $inc: { coin: coinsPackage },
      });

      return res.status(200).json({
        success: true,
        message: "Coins purchased successfully",
        data: result,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
module.exports = { createUser, getCurrentUser, purchaseCoins };
