import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createVerifyToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    },
    process.env.SECRET_KEY_SIGN_TOKEN,
    {
      expiresIn: "10s",
    }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    {
      expiresIn: "365d",
    }
  );
};

class authController {
  async register(req, res) {
    let hashPassword = null;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(req.body.password, salt);
    }
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    await user
      .save()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  async login(req, res) {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Wrong email");
    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) return res.status(401).json("Wrong password");
    if (user && password) {
      const token = createVerifyToken(user);
      const refresh = createRefreshToken(user);
      await userModel.findByIdAndUpdate(user.id, {
        refreshToken: refresh,
      });
      return res.status(200).json({ user, token });
    }
  }

  async refresh(req, res) {
    await userModel
      .findById(req.params.id)
      .then((user) => {
        const refreshToken = user.refreshToken;
        jwt.verify(
          refreshToken,
          process.env.SECRET_KEY_REFRESH_TOKEN,
          async (err, user) => {
            if (err) {
              res.status(500).json(err);
            } else {
              const newToken = createVerifyToken(user);
              await userModel.findByIdAndUpdate(user.id, {
                refreshToken: createRefreshToken(user),
              });
              return res.status(200).json(newToken);
            }
          }
        );
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

export default new authController();
