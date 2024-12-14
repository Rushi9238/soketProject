import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
    const naviagte= useNavigate()
    const [userName,sertUserName]=useState("")
    const [userEmail,setUserEmail]=useState("")
    const [userPassword,setUserPassword]=useState("")


    const handelSignUpForm=async()=>{
      if(!(userName && userEmail && userPassword)){
       alert("All fields are required")
       return
      }
      try {
        const formData=new FormData()
      formData.append("userName",userName)
      formData.append("userEmail",userEmail)
      formData.append("password",userPassword)
      const response = await axios.post('/api/v1/user/resister',formData)
      if(response.data.success){
        naviagte('/sign-in')
        setUserEmail("")
        setUserPassword("")
        sertUserName("")
      }else{
        alert(response.data.message)
        setUserEmail("")
        setUserPassword("")
        sertUserName("")
      }
      } catch (error) {
       console.error(error) 
      }
    }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl my-11">Sign Up</h1>
        <div className="flex items-center">
          <p className="w-24">User Name: </p>
          <input value={userName} onChange={e=>sertUserName(e.target.value)} className="border" type="text" placeholder="Enter User Name" />
        </div>
        <div className="flex items-center my-4">
        <p className="w-24">Email ID: </p>
          <input value={userEmail} onChange={e=>setUserEmail(e.target.value)} className="border" type="email" placeholder="Enter Email" />
        </div>
        <div className="flex items-center my-4">
          <p className="w-24"> Password : </p>
          <input value={userPassword} onChange={e=>setUserPassword(e.target.value)} className="border" type="password" placeholder="Enter Password" />
        </div>
        <div>
          {" "}
          <button className="mr-5 border py-1 px-3" onClick={handelSignUpForm}>Sign Up</button> <button className="border py-1 px-3" onClick={()=>naviagte('/sign-in')}>Sign-In</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
