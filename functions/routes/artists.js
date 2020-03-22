const router = require('express').Router();
const rp = require('request-promise');
const keys = require('../secret-keys/env-vars');

router.post('/artist', (req, res) => {
    const token = req.body.token
    const id = req.body.id;

    const playlistOptions = {
        url: `https://api.spotify.com/v1/artists/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };

    rp(playlistOptions).then((response) => {
        res.send({ artist: JSON.parse(response) })
    })



})


module.exports = router;