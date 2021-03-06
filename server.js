//Dependencies
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

//auth-Helpers
const authHelpers = require('./services/auth/auth-helpers')

//initialize app
const app = express();
require('dotenv').config();

//telling what the app should use
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        key: process.env.SECRET_KEY,
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

//Tell the app to listen to the port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

//tell the app to say hello world at /
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Routes will go here!
const authRouter = require('./routes/auth-routes');
app.use('/api/auth', authRouter);
const followersRoutes = require('./routes/followers-router');
app.use('/api/followerList', followersRoutes);

// Outfits routes
const outfitRoutes = require('./routes/outfit-routes');
app.use('/api/outfits', outfitRoutes);

// Shopping carts routes
const shoppingCartRoutes = require('./routes/shoppingCart-routes');
app.use('/api/shopping-carts', authHelpers.loginRequired, shoppingCartRoutes);

app.use('*', (req, res) => {
    res.status(400).json({
        message: 'Not Found!',
    });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        error: err,
        message: err.message,
    });
});