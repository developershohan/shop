import jwt, { decode } from "jsonwebtoken"
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import { isEmail, isMobile } from "../helpers/helpers.js"

// create token verify middleware
const tokenVerify = (req, res, next) => {

    // get server token
    const accessToken = req.cookies.accessToken

    // check token 
    if (!accessToken) {
        return res.status(400).json({ message: 'Unauthenticated' })
    }
    
    jwt.verify(accessToken, process.env.USER_LOGIN_SECRET,
        asyncHandler(async (error, decode) => {
            if (error) {
                
                return res.status(400).json({ message: 'Invalid Token' })
            }

            let me = null
            if (isEmail(decode.auth)) {
                me = await User.findOne({email: decode.auth}).select("-password")
            } else if (isMobile(decode.auth)) {
                me = await User.findOne({email: decode.auth}).select("-password")
            }

            req.me = me
            next()
    
        }))
        
        // get login user data

}
export default tokenVerify