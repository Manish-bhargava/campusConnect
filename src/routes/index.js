const v1router=require('./v1');
const express=require("express");
const apiRouter=express.Router();
const authRouter=require('./v1/auth.router');
// apiRouter.use('/v1',v1router);
apiRouter.use('/v1/auth', authRouter);
module.exports=apiRouter;
