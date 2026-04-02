import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'

export const protectRoute = async(req ,res ,next) =>{
      try {
            const token = req.cookie.jwt
            if(!token){
                  return res.status(401).json({message : "Unauthorized - No Token Provided"})
            }
            const decorded = jwt.verify(token , process.env.JWT_SECRET)

            if(!decorded){
                  return res.status(401).json({message : "Unauthorized - Invalid Token"})
            }
            const user = await User.findById(decorded.userId).select("-password")

            if(!user){
                  return res.status(404).json({message : "User not found"}) 
            }
            req.user = user 
            
            next()
            
            
      } catch (error) {
            console.log()
      }
}