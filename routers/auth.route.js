import express from "express";
import {
  accountActivationByOTP,
  getLoggedInUser,
  login,
  profile,
  registerUser,
  userLogout,
} from "../controllers/auth.controller.js";
import tokenVerify from "../middleware/tokenVerify.js";

// init router form express
const router = express.Router();

// routing
router.post("/register", registerUser);
router.post("/account-activate-by-otp/:token", accountActivationByOTP);
router.post("/login", login);
router.post("/me", tokenVerify, getLoggedInUser)
router.post("/logout",tokenVerify, userLogout);

// export default
export default router;
