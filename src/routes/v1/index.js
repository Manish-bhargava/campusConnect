const homePing=require('../../controllers/homepingControler');
const express=require("express");
const v1router=express.Router();
v1router.get('/ping',homePing);
module.exports=v1router;