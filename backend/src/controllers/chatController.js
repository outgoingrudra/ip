import { chatClient } from "../lib/stream.js";


export async function getStreamToken(req,res){
    try {
        //use clerk id for stream -> should match id in stream dashboard
        const token = chatClient.createToken(req.user.clerkId)

        res.status(200).json({
            token ,
            userId : req.user.clerkId,
            userName : req.user.name,
            userImage : req.user.profileImage
        })
        
    } catch (error) {
        console.log("Error in chatController.js "+error)

        res.status(500).json({
            message : " Internal Server Error "
        })
        
    }

}