const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const Role = require("../model/roleModal");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password, roleId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      roleId,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user", details: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ where: { email }, include: Role });
    console.log(user);

    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid credentials" });

    const roleName = user.role ? user.role.name : null;
    console.log(roleName);

    const token = jwt.sign(
      { id: user.id, username: user.username, role: roleName },
      "role",
      {
        expiresIn: "1h",
      }
    );
    // res.header('auth',token).json(token)
    console.log(token);

    res.status(200).json({
      message: "Logged in successfully",
      success: true,
      username: user.username,
      token,
      role: roleName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to log in", success: false });
  }
};
const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roles", details: error });
  }
};
module.exports = { login, register, getRoles };
