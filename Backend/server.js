require("dotenv").config();
const app=require("./src/app");
const connectDB=require("./src/DB/bd");
connectDB();


app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
})