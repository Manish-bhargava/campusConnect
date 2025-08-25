const express=require("express");
const requestRouter=express.Router();
const {userRequest, RequestHandler}=require("../../controllers/user.request");
const{userAuth}=require("../../utils/auth");
requestRouter.post("/send/:status/:toUserId",userAuth, userRequest);
requestRouter.post("/review/:status/:requestId",userAuth, RequestHandler);
module.exports=requestRouter;
