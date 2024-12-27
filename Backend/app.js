const express=require('express')
const app= express();
const dotenv=require('dotenv')
dotenv.config();
const connectToDb=require("./db/db")
const cors=require('cors')
const userRoutes=require("./routes/user.routes")
const cookieParser=require("cookie-parser")
app.use(express.json());
app.use(express.urlencoded({extended:true}))
connectToDb()
app.use(cors());
app.use(cookieParser());



app.get("/", (req,res)=>{
    res.send("Hello Panakj")
})

app.use("/users",userRoutes)


module.exports=app;
