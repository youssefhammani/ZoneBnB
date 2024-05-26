const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// const sharp = require('sharp');

const User = require('../models/userModel');
const Place = require('../models/PlaceModel');
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

// const uploadByLink = async (req, res) => {
//     const {
//         link
//     } = req.body;

//     const uploadPath = path.join(__dirname, '..', '..', 'uploads/');
//     console.log(uploadPath);
//     const newName = 'photo' + Date.now() + '.jpg';

//     download.image({
//         url: link,
//         dest: uploadPath + newName,
//     });
//     res.json(newName);
// }


const places = async (req, res) => {
    const {
        token
    } = req.cookies;
    const {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    } = req.body;

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
            const placeData = await Place.create({
                owner: decoded.id,
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price
            });

            res.json(placeData);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'An error occurred'
            });
        }
    });
}


const userPlaces = async (req, res) => {
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
            const places = await Place.find({
                owner: decoded.id
            });
            if (!places.length) {
                return res.status(404).json({
                    message: 'No places found for this user'
                });
            }

            res.json(places);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'An error occurred'
            });
        }
    });
}


const getPlacesById = async (req, res) => {
    const {
        id
    } = req.params;
    const place = await Place.findById(id);
    if (!place) {
        return res.status(404).json({
            message: 'Place not found'
        });
    }
    res.json(place);
}


// const createPlace = async (req, res) => {

// }


const updatePlace = async (req, res) => {
    const {
        token
    } = req.cookies;
    const {
        id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    } = req.body;

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
            const placeData = await Place.findById(req.params.id);
            if (!placeData) {
                return res.status(404).json({
                    message: 'Place not found'
                });
            }

            if (placeData.owner.toString() !== decoded.id) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }

            placeData.set({
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price
            });

            const updatedPlace = await placeData.save();

            res.json(updatedPlace);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'An error occurred'
            });
        }
    });
}

const getPlaces = async (req, res) => {
    res.json(await Place.find());
}




module.exports = {
    register,
    login,
    profile,
    logout,
    places,
    userPlaces,
    getPlacesById,
    // createPlace,
    updatePlace,
    getPlaces,
};