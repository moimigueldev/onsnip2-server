const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRoute = require('./routes/login')
const userRoute = require('./routes/user')
const playlistRoute = require('./routes/playlist')
const artistsRoute = require('./routes/artists')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES
app.use('/auth', loginRoute);
app.use('/profile', userRoute);
app.use('/playlist', playlistRoute);
app.use('/artists', artistsRoute);

app.get('/', (req, res) => {
    res.send('ok')
})

exports.app = functions.https.onRequest(app);