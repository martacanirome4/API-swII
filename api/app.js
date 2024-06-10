require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tracksRouter = require('./routes/tracks');
const openAI = require("openai");
const albumsRouter = require('./routes/albums');
const conn = require('./db/conn');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyTracks = require('./routes/spotifyTracks');
const weatherRoutes = require('./routes/weather');
const apiErrorHandler = require('./middleware/apiErrorHandler');
const spotifyRouter = require('./routes/spotify');
const artistsRouter = require('./routes/artists');
const musicBrainzRouter = require('./routes/musicBrainz');
const base_uri = process.env.BASE_URI || '/api/v1';
const chatRouter = require('./routes/chat');

const app = express();

// Database connection
conn.connectToDatabase();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(base_uri + '/', indexRouter);
app.use('/users', usersRouter);
app.use(base_uri + '/tracks', tracksRouter);
app.use(base_uri + '/albums', albumsRouter);
app.use(base_uri + '/artists', artistsRouter);
app.use(base_uri + '/spotify-tracks', spotifyTracks);
app.use(base_uri + '/weather', weatherRoutes);
app.use(base_uri + '/spotify', spotifyRouter);
app.use(base_uri + '/musicbrainz', musicBrainzRouter);
app.use(base_uri + '/chat', chatRouter);

// Error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
    console.error(err.stack);
});


module.exports = app;
