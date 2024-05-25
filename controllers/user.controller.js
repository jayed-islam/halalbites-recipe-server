const User = require("../models/User");
const { userService } = require("../services/user.service");
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
          expiresIn: "1h",
        }
      );
      return res.status(400).json({
        success: false,
        message: "User already exists",
        token: token,
      });
    }
    const result = await userService.createUserIntoDB(userData);

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      success: true,
      message: "User created succesfully!",
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

// const purchaseCoins = async (req, res) => {
//   const { userId, coinsPackage } = req.body; // coinsPackage can be 100, 500, or 1000

//   try {
//     // Call payment gateway service to process payment
//     const paymentResult = await paymentGateway.processPayment(coinsPackage);

//     // If payment is successful, update user's coin balance
//     if (paymentResult.success) {
//       // Update user's coin balance based on the selected coins package
//       let additionalCoins;
//       switch (coinsPackage) {
//         case 100:
//           additionalCoins = 100;
//           break;
//         case 500:
//           additionalCoins = 500;
//           break;
//         case 1000:
//           additionalCoins = 1000;
//           break;
//         default:
//           additionalCoins = 0;
//       }

//       // Update user's coin balance
//       await User.findByIdAndUpdate(userId, { $inc: { coin: additionalCoins } });

//       // Redirect user to all recipe pages or recipe details
//       res
//         .status(200)
//         .json({ success: true, message: "Coins purchased successfully" });
//     } else {
//       // If payment fails, return error message
//       res.status(400).json({ success: false, message: "Payment failed" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };
export const userController = { createUser, getCurrentUser };
