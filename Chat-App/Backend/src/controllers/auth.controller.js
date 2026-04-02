import { json } from 'express'
import generateToken from '../lib/utils.js'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import cloudinary from '../lib/cloudinary.js'
export const signup = async (req, res) => {
      const { fullName, email, password } = req.body
      console.log(req.body)
      try {
            // hash password 
            if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" })
            const user = await User.findOne({ email })

            if (user) return res.status(400).json({ message: "User already exist" })
            const salt = await bcrypt.genSalt(10)

            const hashpassword = await bcrypt.hash(password, salt)

            const newUser =  new User({
                  fullName: fullName,
                  email: email,
                  password: hashpassword
            })

            if (newUser) {
                  // generate jwt token here 
                  await newUser.save()
                  generateToken(newUser._id, res)
                  res.status(201).json({
                        _id: newUser._id,
                        fullName: newUser.fullName,
                        email: newUser.email,
                        profilePic: newUser.profilePic
                  })
            } else {
                  console.log("Error in signup controller", error.message)
                  res.status(500).json({ message: "sever internal issue" })
            }


      } catch (error) {
            console.log("Signup error:", error.message);
    res.status(500).json({ message: "Server error" });
      }
}

export const login = async(req, res) => {
      const {email , password} = req.body;
      try {
            const user = await User.findOne({email})
            if(!user){
                  return res.status(404).json({message : "User not found"})
            }
            const isPasswordCorrect = await bcrypt.compare(password , user.password)

            if(!isPasswordCorrect){
                  return res.status(400).json({message : "Invalid credentials" })
            }
            generateToken(user._id , res)

            res.status(200).json({
                  _id : user._id,
                  fullName : user.fullName,
                  email : user.email,
                  profilePic : user.profilePic
            })
            
      } catch (error) {
            console.log("Error in login controller" , error.message)
            res.status(500).json({message : "Internals Server error"})
      }
}

export const loginOut = async(req, res) => {

     try {
      res.cookie("jwt" , "" , {maxAge : 0})
      res.status(200).json({message : "Logged out successfully"})
      
     } catch (error) {
        console.log("Error in logged out controller" , error.message)
            res.status(500).json({message : "Internals Server error"})
     }
}

export const updateProfile = async(req ,res) =>{
      try {
            const {profilePic} = req.body
            const userId = req.user._id // because of protectRoute funcation 

            if(!profilePic){
                  return res.status(400).json({message : "Profile pic is required"})
            }
            const uploadResponse = await cloudinary.uploader.upload(profilePic)

            const updatedUser = await User.findByIdAndUpdate(userId , {profilePic : uploadResponse.secure_url} , {new : true})

           return res.status(200).json(updatedUser)

      } catch (error) {
            console.log("Error in updateProfile" , error.message)
            return res.status(500).json({message : "server internals error"})
      }
}

export const checkAuth = (req ,res) =>{
      try {
         return res.status(200).json(req.user) 
      } catch (error) {
            console.log("Error in checkAuth controller" , error.message)
            return res.status(500).json({message : "Interval Server Error"})
      }
}