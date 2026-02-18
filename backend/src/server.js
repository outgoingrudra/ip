import express from "express"
import { ENV } from "./lib/env.js";
import path from "path"
import { ConnectDB } from "./lib/db.js";
import cors from "cors"
import {serve} from "inngest/express"
import {inngest,functions} from "./lib/inngest.js"


const app = express()
app.use(cors({origin : ENV.CLIENT_URL, credentials : true}))
app.use(express.json())
app.use("/api/inngest",serve({client :inngest , functions }))


const __dirname = path.resolve()
app.get("/book",(req,res)=>{
    res.send("Book")
})


app.get("/files",(req,res)=>{
    res.send("files")
})


if(ENV.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../../frontend","dist","index.html"))
    })
}
// time -> 41.29



const startServer = async()=>{
      try {
         await ConnectDB()
       app.listen(ENV.PORT ,()=>{
        console.log("Server running on Port :"+ENV.PORT);
        
       })
        
      } catch (error) {
        console.log("Error starting to server :",error.message)
        
      }
}

startServer()
