import express from "express";
import authRoute from "./auth.js";
import userRoute from "./user.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use("/auth", authRoute);
router.use(
  "/user",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdminToken,
  userRoute
);
export default router;
