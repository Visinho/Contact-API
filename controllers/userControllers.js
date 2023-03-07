const asyncHandler = require("express-async-handler");
// const Contact = require("../models/contactModel");

//Register a user
//@routes POST /api/users/register
//access public
const registerUser = asyncHandler(async (req, res) => {
    res.json({Message: "Register the user"})
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