import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";

const signup = TryCatch(async (req, res, next) => {
    // const { name, username, password, bio } = req.body;

    // const file = req.file;

    // if (!file) return next(new ErrorHandler("Please Upload Avatar"));

    // const result = await uploadFilesToCloudinary([file]);

    // const avatar = {
    //     public_id: result[0].public_id,
    //     url: result[0].url,
    // };

    const user = await User.create({
        name:"dkdkd",
        bio:"dkkdd",
        username:"dkdd",
        password:"38eiee",
    });

    // sendToken(res, user, 201, "User created");
    res.status(200).json({message:"hello new user"})
});

const login = (req, res, next) => {

}

export { login, signup };