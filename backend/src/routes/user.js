import express from "express";
import userController from "../controllers/userController.js";
const userRoute = express.Router();

userRoute.get("/", userController.index);
userRoute.post("/:id", userController.show);
userRoute.put("/:id", userController.update);
userRoute.delete("/:id", userController.delete);

export default userRoute;
