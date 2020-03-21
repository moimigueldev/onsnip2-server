const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');
const keys = require('../secret-keys/env-vars');
const scopes = keys.spotify['scopes'];

const spotifyApi = new SpotifyWebApi({
    clientId: keys.spotify['client-id'],
    clientSecret: keys.spotify['client-secret'],
    redirectUri: encodeURIComponent(keys.spotify['redirect-url']),
});




router.get('/login', (req, res) => {
    let html = spotifyApi.createAuthorizeURL(scopes)
    html = html.replace('code', 'token');
    res.send({ url: html })
})



router.get('/callback', (req, res) => {
    console.log('redirect-component')
    res.redirect(keys.routes['redirect-url'])
});


module.exports = router;
