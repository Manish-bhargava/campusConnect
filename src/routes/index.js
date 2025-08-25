const v1router=require('./v1');
const express=require("express");
const apiRouter=express.Router();
apiRouter.use('/v1',v1router);
module.exports=apiRouter;
