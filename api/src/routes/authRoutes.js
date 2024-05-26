const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authController.profile);
router.post('/logout', authController.logout);
router.post('/places', authController.places);
router.get('/user-places', authController.userPlaces);
router.get('/places/:id', authController.getPlacesById);
router.put('/places/:id', authController.updatePlace);
router.get('/places', authController.getPlaces);
// router.post('/upload-by-link', authController.uploadByLink);
// router.post('/upload', authController.upload);
// router.get('/logout', authController.logout);
// router.get('/refresh', authController.refresh);
// router.get('/me', authController.me);

module.exports = router;
