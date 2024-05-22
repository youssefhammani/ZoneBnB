const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer');
const User = require('../models/userModel');
const config = require('../../config/config');

const app = express();
app.use(express.json());
app.use(cookieParser());


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

const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'All fields are required',
        });
    }

    const user = await User.findOne({
        email
    });

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            jwt.sign({
                email: user.email,
                id: user._id
            }, config.jwt.accessTokenSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        } else {
            res.status(422).json('Invalid credentials');
        }
    } else {
        res.json('User not found');
    }
}

const profile = async (req, res) => {
    const {
        token
    } = req.cookies;

    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    jwt.verify(token, config.jwt.accessTokenSecret, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

        try {
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const {
                _id,
                username,
                email
            } = user;
            res.json({
                _id,
                username,
                email
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'An error occurred'
            });
        }
    });
}

const logout = async (req, res) => {
    res.cookie('token', '').json(true);
}

const uploadByLink = async (req, res) => {
    const {
        link
    } = req.body;

    // npm i --save image-downloader
    const newName = 'photo' + Data.now() + '.jpg';
    download.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
}

const photosMiddleware = multer({
    dest: '/tmp'
});
const upload = (req, res) => {
    // npm i multer
}


module.exports = {
    register,
    login,
    profile,
    logout,
    uploadByLink,
    upload
};