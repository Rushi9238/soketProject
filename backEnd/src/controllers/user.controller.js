import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const resisterUser = asyncHandler(async (req, res) => {
  const { userName, userEmail, password } = req.body;

  //check validation ther are empty fields
  if (!(userName || userEmail || password)) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields",
      data: null
    });
  }

  // Check Email Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[^\s@]+$/;
  if (!emailRegex.test(userEmail)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
      data: null
    });
  }

  // Check user already exists or not
  const checkExistUser = await User.findOne({ userEmail });

  if (checkExistUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
      data: null
    });
  }

  //Create user object for entry in db

  const userDetils = await User.create({
    userName,
    userEmail,
    password
  });

  //remove password field from response
  const userResponse = await User.findById(userDetils._id).select("-password");

  // Check user are create or not
  if (!userResponse) {
    return res.status(500).json({
      success: false,
      message: "Somethings went wrong while resistering the user",
      data: null
    });
  }

  // Final response retrun
  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: userResponse
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { userEmail, password } = req.body;

  // check user mail and password get not empty
  if (!(userEmail && password)) {
    return res.status(400).json({
      success: false,
      message: "Please enter both email and password",
      data: null
    });
  }
  // check user are resister or not
  const checkExistUser = await User.findOne({ userEmail });
  if (!checkExistUser) {
    return res.status(400).json({
      success: false,
      message: "User not resistered plases resister first",
      data: null
    });
  }

  // check password is correct or not
  const isPassword = await checkExistUser.isPasswordCorrect(password);

  if (!isPassword) {
    return res.status(400).json({
      success: false,
      message: "Password is incorrect",
      data: null
    });
  }
  //   return
  // Generate access token
  const access_token = await checkExistUser.generateAccessToken();

  // Return response and set cookies
  const logedInUser = await User.findById(checkExistUser._id).select(
    "-password"
  );

  const option = {
    httpOnly: true,
    secure: true
  };
  // Convert the Mongoose document to a plain JavaScript object and add access token to the response
  const logedInUserObject = logedInUser.toObject();
  logedInUserObject.accessToken = access_token;

  return res.status(201).cookie("accessToken", access_token, option).json({
    success: true,
    message: "User logged in successfully",
    data: { logedInUserObject }
  });
});

// Resister users list

const userSList = asyncHandler(async (req, res) => {
  // get user deatils
  const {user} = req

  // check user are Admin or not
  // if(user.userRoll !== 1){
  //   return res.status(401).json({
  //     success:false,
  //     message:"User not authrized plases check once again",
  //     data:null
  //   })
  // }

  // get user list 
  const userList= await User.find({userEmail:{$ne:user.userEmail}}).select("-password")

  if(!(Array.isArray(userList))){
    return res.status(500).json({
      success:false,
      message:"Somethings went wrong",
      data:null,
    })
  }
  return res.status(201).json({
    success:true,
    message:"Users List",
    data:{
      userList
    },
  })
});

export { resisterUser, loginUser, userSList };
