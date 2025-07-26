
const express=require("express");
const songroute=require("./routes/song.route");
const cors = require("cors");

const app=express();
app.use(express.json());
app.use(cors());



app.use("/",songroute);

module.exports=app