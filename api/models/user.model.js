import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: "https://www.seekpng.com/png/full/966-9665493_my-profile-icon-blank-profile-image-circle.png",
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User