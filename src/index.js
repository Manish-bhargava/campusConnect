const express= require("express");
const app=express();
const apiRouter=require("./routes");
const connectToDb=require("./db/db");
const cookieParser = require("cookie-parser");
require("dotenv").config(); 
app.use(cookieParser());
app.use(express.json());
app.use('/api',apiRouter);

app.listen(process.env.PORT,async ()=>{
    await connectToDb();
    console.log(`Server is running on port ${process.env.PORT}`);
});
