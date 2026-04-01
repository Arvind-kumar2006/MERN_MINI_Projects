import express from "express";
import { signup, login, loginOut } from '../controllers/auth.controller.js';

 const router = express.Router()

 router.post('/signup', signup)
  router.get('/login', login)
  router.get('/loginout', loginOut)
 export default router