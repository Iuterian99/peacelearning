const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const { use } = require("../routes/publicRoutes");
const jwt = require("jsonwebtoken");
class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.render("login", {
          errors: "Username or password field is empty!",
        });
      }

      const users = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "../data/users.json"), {
          encoding: "utf-8",
          flag: "r",
        })
      );
      const findUser = users.find(
        item => item.name === username && item.password === password
      );

      if (!findUser) {
        return res.render("login", { errors: "User not found!" });
      }

      const token = jwt.sign(
        { id: findUser.id, role: findUser.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      res.redirect(findUser.role);
    } 
    catch (error) {
      return res.render("login", { errors: "Something went wrong!" });
    }
  }

  async AuthController(req, res) {
    try {
      
    } catch (error) {
      console.log(error);
    }
  }

  async register(req, res) {}
}

module.exports = new AuthController();
