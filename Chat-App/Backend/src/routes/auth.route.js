import express from "express";
import { signup, login, loginOut , updateProfile } from '../controllers/auth.controller.js';

 const router = express.Router()

 router.post('/signup', signup)
  router.post('/login', login)
  router.post('/loginout', loginOut)

  router.put("/update-profile" , protectRoute,updateProfile)
 export default router