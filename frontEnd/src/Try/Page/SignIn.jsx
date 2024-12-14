import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { userSignIn } from "../../store/slices/sokets/soketThunks";
import { useDispatch, useSelector } from 'react-redux';

const SignIn = () => {
    const naviagte= useNavigate()
    const [userEmail,setUserEmail]=useState("")
    const [userPassword,setUserPassword]=useState("")
    const dispatch = useDispatch();

    const { users, onlineUsers } = useSelector(
      (state) => state.socket.onlineUsers
    );

    console.log('onlineUsers',users?.filter((item)=>onlineUsers.includes(item._id)).map((item2)=>item2.userName))

    const handelSignInForm=async()=>{
      if(!(userEmail && userPassword)){
        alert("All fields are required")
        return
       }
       try {
        const formData=new FormData()
        formData.append("userEmail",userEmail)
        formData.append("password",userPassword)
        const response= await axios.post("https://soketproject.onrender.com/api/v1/user/log-in",formData)
        if(response.data.success){
          localStorage.setItem("user_logined",response.data.data.logedInUserObject.accessToken)
          localStorage.setItem("isAdmin",response.data.data.logedInUserObject.isAdmin)
          localStorage.setItem("email",response.data.data.logedInUserObject.userEmail)
          dispatch( userSignIn(response.data.data.logedInUserObject.accessToken))
          // if(response.data.data.logedInUserObject.isAdmin){
          //   naviagte('/admin-page')
          // }else{
          // }
          naviagte('/user-page')
        }
       } catch (error) {
        console.error(error)
       }
    }

  return (
    <>
      <div className="flex flex-col items-center ">
        <h1 className="text-4xl my-11">Sign In</h1>
        <div className="flex items-center">
            <p className="w-20">Email ID: </p>
            <input value={userEmail} onChange={e=>setUserEmail(e.target.value)} className="border" type="email" placeholder="Enter Email" />
        </div>
        <div className="flex items-center my-4">
            <p className="w-20"> Password : </p>
            <input value={userPassword} onChange={e=>setUserPassword(e.target.value)} className="border" type="password" placeholder="Enter Password" />
        </div>
        <div>
          {" "}
          <button className="mr-5 border py-1 px-3"  onClick={handelSignInForm} >Sign In</button> <button className="border py-1 px-3" onClick={()=>naviagte('/sign-up')}>Sign-up</button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
