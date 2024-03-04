import { mongoose } from "mongoose";

const addressSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },

    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    phoneNumber:{
        type: String,
        required: true
    }


})

export const Address = mongoose.model("addresses", addressSchema)