import { errorHandler } from "../utils/error.js";
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({
        message: 'API is working!',
    })
};

//update user

export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id){
        // return res.status(401).json("You can update only your account");
        return next(errorHandler(401, 'You can update only your account'));
    }
    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
                // there is a chance that user may send data of the admin and become the admin
                // so only let her give information above not whole $set.
                // for example, admin: true might be sent by a user to become admin.
            },
            {
                new: true//to see the updated user, not the old one
            }
        );
        const {password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch(error){
        next(error);
    }
}



