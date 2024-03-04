import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        required: true,
    },
    lname: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
      },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Customer"
    }, 
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses"
    }],

    paymentAddress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment_address"
    }],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews"
    }]
},
{timestamps: true})

const User = mongoose.model("user", userSchema)

export default User