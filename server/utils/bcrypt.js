const bcrypt = require("bcrypt");
const saltRound = 10;

const createHashPassword = async (password) => {
  try {
    return bcrypt.hashSync(password, saltRound);
  } catch (error) {
    throw new Error("Error while hashing the password");
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    return bcrypt.compareSync(password, hashedPassword);
  } catch (error) {
    throw new Error("Error while comparing the password");
  }
};


module.exports = { createHashPassword, comparePassword };
