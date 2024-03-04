import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { fileDeleteFromCloud, fileUploadToCloud } from "../utils/cloudinary.js";
import {
  createOTP,
  findPublicId,
  isEmail,
  isMobile,
  tokenDecode,
} from "../helpers/helpers.js";
import { sendSMS } from "../utils/sendSMS.js";
import { AccountActivationEmail } from "../mails/AccountActivationEmail.js";

/**
 * @description  User Register
 * @method POST
 * @route /api/v1/auth/register
 * @access public
 */
export const registerUser = asyncHandler(async (req, res,next) => {
  const { fname, lname, auth, password } = req.body;

  // validation
  if (!fname || !lname || !auth || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // create OTP
  const otp = createOTP();
  // check user email or mobile
  let authEmail = "";
  let authPhone = "";

  if (isEmail(auth)) {
    authEmail = auth;

    // check email existance
    const checkEmail = await User.findOne({ email: auth });
    if (checkEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
  } else if (isMobile(auth)) {
    authPhone = auth;

    // check email existance
    const checkPhone = await User.findOne({ phone: auth });
    if (checkPhone) {
      return res.status(400).json({ message: "Phone already exists" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "You must use a Mobile number or Email address" });
  }

  // hash password
  const hashPass = await bcrypt.hash(password, 10);

  // register user
try {
  const user = await User.create({
    fname: fname,
    lname: lname,
    email: authEmail,
    phone: authPhone,
    password: hashPass,
    accessToken: otp,
  });

} catch (error) {
  next(error);
}
  if (User) {
    // send token to cookie
    const activationToken = jwt.sign(
      { auth },
      process.env.ACCOUNT_ACTIVATION_SECRET,
      {
        expiresIn: "15min",
      }
    );

    res.cookie("activationToken", activationToken);

    if (authEmail) {
      // send OTP
      await AccountActivationEmail(auth, { code: otp, link: "" });
    } else if (authPhone) {
      // send otp
      await sendSMS(
        auth,
        `Hello ${name}, You Account activation OTP is ${otp}`
      );
    }
  }

  // response
  res.status(201).json({ user: user, message: "User data created successful" });
});

/**
 * @description  User Account Activation
 * @method POST
 * @route /api/v1/auth/account-activate-by-otp/:token
 * @access public
 */
export const accountActivationByOTP = asyncHandler(async (req, res) => {
  // get token
  const { token } = req.params;
  const { otp } = req.body;

  // token decode
  const activationToken = tokenDecode(token);

  // verify token
  const tokenVerify = jwt.verify(
    activationToken,
    process.env.ACCOUNT_ACTIVATION_SECRET
  );

  if (!tokenVerify) {
    return res.status(400).json({ message: "Invalid token" });
  }

  // activate user
  let activateUser = null;

  if (isEmail(tokenVerify.auth)) {
    activateUser = await User.findOne({ email: tokenVerify.auth });

    if (!activateUser) {
      return res.status(404).json({ message: "Email not found" });
    }
  } else if (isMobile(tokenVerify.auth)) {
    activateUser = await User.findOne({ phone: tokenVerify.auth });

    if (!activateUser) {
      return res.status(404).json({ message: "Phone not found" });
    }
  } else {
    return res.status(400).json({ message: "Invalid User account" });
  }

  // check OTP
  if (otp !== activateUser.accessToken) {
    return res.status(400).json({ message: "Wrong OTP" });
  }

  // update activate user data
  activateUser.isActivate = true;
  activateUser.accessToken = null;
  activateUser.save();

  // clear cookie
  res.clearCookie("activationToken");

  // response
  res
    .status(200)
    .json({ user: activateUser, message: "User activation successful" });
});



/**
 * @description  User Account Login
 * @method POST
 * @route /api/v1/auth/login
 * @access public
 */

export const login = asyncHandler(async (req, res) => {
  // get data
  const { auth, password } = req.body;

  // validate login
  if (!auth || !password) {
    return res.status(400).json({ message: `All fields are required` });

  }

  // check user auth
  let loginUser = null

  if (isEmail(auth)) {
    // find login user
    loginUser = await User.findOne({ email: auth })
    if (!loginUser) {

      return res.status(400).json({ message: `Email not found` });
    }

  } else if (isMobile(auth)) {
    // find login user
    loginUser = await User.findOne({ phone: auth })

    if (!loginUser) {
      return res.status(400).json({ message: `phone not found` });

    }

  } else {
    return res.status(400).json({ message: `User must have an email or mobile number` });
  }



  // check password
  const passwordCheck = await bcrypt.compare(password, loginUser.password)

  if (!passwordCheck) {

    return res.status(400).json({ message: `Wrong password` });
  }

  // create login user token
  const accessToken = jwt.sign({ auth: auth }, process.env.USER_LOGIN_SECRET, {
    expiresIn: "365d"
  })

  // set token
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 365
  })

  res.status(200).json({ accessToken, user: loginUser, message: `login successfully` })
});

export const profile = (req,res)=>{
console.log(req.me);
}

/**
 * @description  get Logged In User data
 * @method GET
 * @route /api/v1/auth/me
 * @access private
 */

export const getLoggedInUser = asyncHandler(async(req, res)=>{
  if (!req.me) {
    return res.status(404).json({message: 'Logged in user not found'})
  }
  res.status(200).json({auth: req.me })
})

/**
 * @description  User logout
 * @method POST
 * @route /api/v1/auth/logout
 * @access private
 */

export const userLogout = asyncHandler(async(req, res)=>{
res.clearCookie("accessToken")
  res.status(200).json({message: "Logout Successful" })
})