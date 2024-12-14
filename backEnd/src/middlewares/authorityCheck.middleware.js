import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'


export const authorityCheck=asyncHandler(async(req,res,next)=>{
    try {
        const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthorized user",
                data:null
            })
        }

        const decodeToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(decodeToken?.exp < Math.floor(Date.now()/1000)){
            return res.status(401).json({
                success:false,
                message:"Access token expire",
                data:null
            })
        }
        const user= await User.findById(decodeToken?._id).select("-password")
        // console.log(decodeToken.exp,"/",Math.floor(Date.now()/1000))
        if(!user){
           return res.status(401).json({
                success:false,
                message:"User not Found",
                data:null
            })
        }

        // if(user.userRoll !== 1){
        //     return res.status(401).json({
        //         success:false,
        //         message:"User not accessible for that",
        //         data:null
        //     })
        // }
        req.user=user,
        next()
        
    } catch (error) {
        console.error("Error comes when checking authority",error)
    }
})