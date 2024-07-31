const { generateToken } = require("../jwt/JwtService");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { name, gender, dob, email, password, conformPassword, majors } =
      req.body;
    if (password !== conformPassword)
      return res.send({ message: "Conform password is invalid!" });
    const user = await User.findOne({ username: username });
    if (user) return res.send({ message: "User already exits" });
    //hashpassword
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      gender: gender,
      dob: dob,
      email: email,
      password: hashpassword,
      majors: majors,
    });
    await newUser.save();
    return res.status(201).json({ data: newUser });
  } catch (err) {
    console.log("Error signup: ", err.message);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = generateToken(username);
        return res.status(200).json({ token: token });
      }
      return res.send("Password is incorrect");
    }
    return res.send("Username is incorrect");
  } catch (err) {
    console.log("Error login: ", err.message);
  }
};

module.exports = { signup, login };
