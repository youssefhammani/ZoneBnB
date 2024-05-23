const express = require('express');
const path = require('path');
const download = require('image-downloader');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const dbMiddleware = require('./middleware/dbMiddleware');

const app = express();
dotenv.config();


app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(dbMiddleware);

const uploadPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadPath));




app.post('/api/auth/upload-by-link', async (req, res) => {
    const {
        link
    } = req.body;

    const newName = 'photo' + Date.now() + '.jpg';
    const dest = path.join(uploadPath, newName);

    try {
        await download.image({
            url: link,
            dest
        });
        // console.log('Image downloaded to', dest);
        res.json(newName);
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({
            error: 'An error occurred while downloading the image.'
        });
    }
});

app.get('/test', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

// Routes and other app configuration
const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/users', userRoutes);



module.exports = app;