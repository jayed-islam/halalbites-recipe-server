const User = require("../models/User");

const createUserIntoDB = async (userData) => {
  const result = await User.create(userData);
  return result;
};

module.exports = { createUserIntoDB };
