import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
class userController {
  // GET ALL USER
  async index(req, res) {
    await userModel
      .find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  //   GET ONE USER
  async show(req, res) {
    await userModel
      .findById(req.params.id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  //   UPDATE USER
  async update(req, res) {
    let password = req.body.password;
    if (password) {
      password = await bcrypt.hash(password, 10);
    }
    await userModel
      .findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: password,
      })
      .then(() => {
        res.status(200).json("Update successfully");
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  //   DELETE USER
  async delete(req, res) {
    await userModel
      .findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json("Delete successfully");
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}
export default new userController();
