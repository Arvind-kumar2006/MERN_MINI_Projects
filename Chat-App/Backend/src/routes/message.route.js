import express from 'express'
import { protectRoute } from '../middleware/auth.middleware'

const router = express.Router()

// in sidebar get all users who's are logged in 
router.get('/users' , protectRoute , getUsersForSidebar)

// for chat with particular user get all previous till now sended 
router.get("/:id" , protectRoute , getMessages)

router.post("/send/:id" ,protectRoute , sendMessage )

export default router