import express from "express"
import dotenv from "dotenv"

dotenv.config()
console.log(process.env.PORT);


const app = express()

app.get("/",(req,res)=>{
    res.status(200).json({msg:"Success from Api"})
})



app.listen(3000,()=>{console.log("Server is running on port 3000")})