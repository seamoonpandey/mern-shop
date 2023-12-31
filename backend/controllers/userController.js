import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser=asyncHandler(async (req, res) => {
    const { email, password }=req.body;

    const user=await User.findOne({ email });
    console.log(user);
    if (user&&(await user.matchPassword(password))) {

        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser=asyncHandler(async (req, res) => {
    const { name, email, password }=req.body;
    const userExists=await User.findOne({ email: email });

    if (userExists) {
        res.status(400);
        throw new Error('User alredy exists');
    } else {
        const user=await User.create({
            name,
            email,
            password
        });
        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })
        } else {
            res.status(404);
            throw new Error('Invalid email or password');
        }
    }
    res.send('register user');
});

// @desc    Logout user /clear cookie
// @route   POST /api/users/logout
// @access  Private

const logoutUser=asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully' });
});


// @desc    Get user profile
// @route   GET /api/users/logout
// @access  Public
const getUserProfile=asyncHandler(async (req, res) => {
    res.send('get user profile');
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile=asyncHandler(async (req, res) => {
    res.send('update profile');
});

// @desc    GET users
// @route   GET /api/users
// @access  Private/Admin
const getUsers=asyncHandler(async (req, res) => {
    res.send('get users all true');
});

// @desc    GET users
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById=asyncHandler(async (req, res) => {
    res.send('get user by id');
});

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser=asyncHandler(async (req, res) => {
    res.send('del user');
});

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser=asyncHandler(async (req, res) => {
    res.send('update profile');
});

export { authUser, registerUser, getUserById, getUserProfile, getUsers, logoutUser, updateUserProfile, updateUser, deleteUser }