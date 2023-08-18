import jwt from "jsonwebtoken";
class authMiddleware {
  verifyToken(req, res, next) {
    if (req.headers.token) {
      const token = req.headers.token.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY_SIGN_TOKEN, (err, user) => {
        if (err) return res.status(500).json("Token valided!");
        req.user = user;
        next();
      });
    } else {
      return res.status(500).json("You're not login");
    }
  }

  verifyAdminToken(req, res, next) {
    if (!req.user.admin) {
      res.status(500).json("You're not admin");
    } else {
      next();
    }
  }
}

export default new authMiddleware();
