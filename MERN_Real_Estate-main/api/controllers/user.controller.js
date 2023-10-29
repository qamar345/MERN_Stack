import { errorHandler } from "../utils/error.js"
import User from "../models/user.model.js";
import bcriptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({
        name: "API router is working",
    })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "Unauthorized User"));

    try {
        if (req.body.password) {
            req.body.password = bcriptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true });

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}