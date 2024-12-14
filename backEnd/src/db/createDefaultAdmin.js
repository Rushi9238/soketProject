import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt' 

 export const createDefaultAdmin=async()=>{
try {
    const checkAdminCreated=await User.findOne({isAdmin:true})

    if(!checkAdminCreated){
        const setDefualtpassword="admin123"
        const hashedPassword =await bcrypt.hash(setDefualtpassword,10)
        await User.create({
            userName:'admin',
            userEmail:'123@admin.com',
            isAdmin:true,
            password:hashedPassword ,
            userRoll:'admin'
        })
        console.log('Admin created')
    }else{
        console.log('Admin already created')
    }

} catch (error) {
    console.error("Errors comes when default admin is created", error);
}
}
