const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const dbMiddleware = require('./middleware/dbMiddleware');

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(dbMiddleware);

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