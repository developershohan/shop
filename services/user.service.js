
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import {getUserIdFromToken} from "../config/jwtProvider.js"

//  create user service
const createUser = async (userdata) => {
    try {
        let { fname, lname, email, password } = userdata;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new Error('User already exists :', email)
        }

        // hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fname,
            lname,
            email,
            password: hashedPassword
        })
        console.log(`user created`);
        return user

    } catch (error) {
        throw Error(error.message)
    }
}

// find user by id
const findUserById = async (userId) => {

    try {
        const user = await User.findById(userId)
        // .populate("address");

        if (!user) {
            throw new Error('User not found by id :', userId)
        }
        return user

    } catch (error) {
        throw new Error(error.message)
    }
}

// get user by id
const getUserByEmail = async (email) => {

    try {
        const user = await User.findOne({email})

        if (!user) {
            throw new Error('User not found by email :', email)
        }
        return user

    } catch (error) {
        throw new Error(error.message)
    }
}

// get user profile by token
const getUserProfileByToken = async (token) => {

    try {

        const userId = getUserIdFromToken(token)

        const user = await findUserById(userId)

        if (!user) {
            throw new Error(" user not found with id:", userId)
        }
        return user

    } catch (error) {
        throw new Error(error.message)
    }
}

// get all user
const getAlluser = async () => {
    try {
        const users = await User.find()
        return users
    } catch (error) {
        throw new Error(error.message)
    }
}

export default { createUser, findUserById, getUserByEmail, getUserProfileByToken, getAlluser }