import express from "express"
import { ENV } from "./lib/env.js";
import path from "path"
import { ConnectDB } from "./lib/db.js";
import cors from "cors"
import {serve} from "inngest/express"
import {inngest,functions} from "./lib/inngest.js"
import {clerkMiddleware} from "@clerk/express"
import chatRoutes from "./routes/chatRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"

const app = express()
app.use(cors({origin : ENV.CLIENT_URL, credentials : true}))
app.use(express.json())
app.use(clerkMiddleware())
app.use("/api/inngest",serve({client :inngest , functions }))


const __dirname = path.resolve()
app.get("/book",(req,res)=>{
    console.log(req.auth);
    
    res.send("Book")
})

app.use("/api/chat",chatRoutes)
app.use("/api/sessions",sessionRoutes)


if(ENV.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html")) 
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