const express = require('express');
const User = require('../models/userModel');

const app = express();
app.use(express.json());


/**
 * Handles registering a new user
 * 
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @return {Promise<void>} - Returns a promise that resolves when the user is registered successfully or rejects with an error.
 */
const register = async (req, res) => {
    const {
        username,
        email,
        password,
    } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required',
        });
    }

    const duplicate = await User.findOne({
        email,
    }).exec();

    if (duplicate) {
        return res.sendStatus(409);
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const userObject = {
            username,
            email,
            password: hashedPassword,
        };

        const user = await User.create(userObject);

        res.status(201).json({
            message: 'User created',
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = {
    register
};