const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//Register a user
//@routes POST /api/users/register
//access public
const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { username, email, password } = req.body
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists")
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password is:", hashedPassword)
    const user = await User.create({
        username, email, password: hashedPassword,
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid")
    }
    res.json({Message: "Register the user"})
    } catch (error) {
        console.log(error)
        next(error)
    }
    
});

//Login user
//@routes POST /api/users/login
//access public
const loginUser = asyncHandler(async (req, res) => {
    res.json({Message: "Login user"})
});

//Current user info
//@routes POST /api/users/current
//access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({message: "Current user information"})
});


module.exports = {registerUser, loginUser, currentUser};