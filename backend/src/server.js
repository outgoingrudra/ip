import express from "express"
import { ENV } from "./lib/env.js";
import path from "path"
import { ConnectDB } from "./lib/db.js";
import cors from "cors"
import {serve} from "inngest/express"
import {inngest,functions} from "./lib/inngest.js"
import fs from "fs"

console.log("=========== SERVER BOOT DEBUG START ===========")

console.log("Process CWD:", process.cwd())
console.log("Process NODE_ENV:", process.env.NODE_ENV)
console.log("ENV.NODE_ENV:", ENV.NODE_ENV)
console.log("ENV.PORT:", ENV.PORT)
console.log("ENV.CLIENT_URL:", ENV.CLIENT_URL)

const app = express()

console.log("Express app created")

app.use((req,res,next)=>{
    console.log("Incoming Request:", req.method, req.url)
    next()
})

app.use(cors({origin : ENV.CLIENT_URL, credentials : true}))
console.log("CORS middleware registered")

app.use(express.json())
console.log("JSON middleware registered")

app.use("/api/inngest",serve({client :inngest , functions }))
console.log("Inngest route registered at /api/inngest")

const __dirname = path.resolve()
console.log("__dirname (path.resolve()):", __dirname)

const frontendDistPath = path.join(__dirname,"../frontend/dist")
console.log("Computed frontendDistPath:", frontendDistPath)

console.log("Does frontendDistPath exist?:", fs.existsSync(frontendDistPath))

if(fs.existsSync(frontendDistPath)){
    console.log("Files inside frontendDistPath:", fs.readdirSync(frontendDistPath))
}else{
    console.log("frontendDistPath does NOT exist")
}

app.get("/book",(req,res)=>{
    console.log("/book route hit")
    res.send("Book")
})

app.get("/files",(req,res)=>{
    console.log("/files route hit")
    res.send("files")
})

console.log("Checking production block condition...")
console.log("Is ENV.NODE_ENV === 'production' ?", ENV.NODE_ENV === "production")

if(ENV.NODE_ENV ==="production"){

    console.log("=== ENTERED PRODUCTION BLOCK ===")

    console.log("Registering express.static with path:", frontendDistPath)

    app.use(express.static(frontendDistPath))

    console.log("Static middleware registered")

    app.get("/{*any}",(req,res)=>{

        console.log("Wildcard route hit")
        console.log("Requested URL:", req.url)

        const indexPath = path.join(__dirname,"../frontend","dist","index.html")

        console.log("Computed index.html path:", indexPath)
        console.log("Does index.html exist?:", fs.existsSync(indexPath))

        if(fs.existsSync(indexPath)){
            console.log("Sending index.html")
        } else {
            console.log("index.html NOT FOUND")
        }

        res.sendFile(indexPath) 
    })

    console.log("Wildcard route registered")

}else{
    console.log("NOT in production mode — skipping static serving")
}

console.log("=========== ROUTES SETUP COMPLETE ===========")

const startServer = async()=>{

      console.log("Starting server...")
      try {

         console.log("Connecting to DB...")
         await ConnectDB()
         console.log("DB connected successfully")

         app.listen(ENV.PORT ,()=>{
            console.log("===================================")
            console.log("Server running on Port :",ENV.PORT)
            console.log("Server URL maybe:", `http://localhost:${ENV.PORT}`)
            console.log("===================================")
         })
        
      } catch (error) {
        console.log("Error starting the server :",error.message)
      }
}

startServer()

console.log("=========== SERVER FILE LOADED ===========")
