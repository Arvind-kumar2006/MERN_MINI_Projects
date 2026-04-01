import generateToken from '../lib/utils.js'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
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

export const login = (req, res) => {
      res.send("login")
}

export const loginOut = (req, res) => {
      res.send("loginout")
}