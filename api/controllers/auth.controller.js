import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async(req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save()
        //await helps first let the info be saved, then move to next line
        res.status(201).json({message:"User created successfully"});
    }
    catch(error){
        next(errorHandler(300, "something went wrong"));
    }
    
};