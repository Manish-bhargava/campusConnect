const express=require("express");
const authRouter=express.Router();
const {login,signup,logout}=require("../../controllers/user.auth");

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

module.exports = authRouter;