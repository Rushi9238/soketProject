import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    userRoll: {
      type: Number,
      default:2, // Default to "user" role (e.g., 1 = Admin, 2 =User )
      enum:[1,2]
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true
    }
    // refreshToken:{
    //     type:String,
    // }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
  return  bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function() {
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      userEmail: this.userEmail,
      isAdmin: this.isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

export const User = mongoose.model("User", userSchema);
