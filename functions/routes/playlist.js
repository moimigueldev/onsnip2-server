const router = require('express').Router();
const rp = require('request-promise');
const keys = require('../secret-keys/env-vars');

// https://api.spotify.com/v1/playlists/{playlist_id}
router.post('/playlistId', (req, res) => {
    const playlistId = req.body.id;
    const token = req.body.token;


    const playlistOptions = {
        url: `https://api.spotify.com/v1/albums/${playlistId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };

    rp(playlistOptions).then(response => {

        res.send(JSON.parse(response))
    })


})


module.exports = router;