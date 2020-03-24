const router = require('express').Router();
const rp = require('request-promise');
const keys = require('../secret-keys/env-vars');

router.post('/track', async (req, res) => {
    const token = req.body.token
    const id = req.body.id;

    const trackFeaturesOptions = {
        url: `https://api.spotify.com/v1/audio-features/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };
    const trackOptions = {
        url: `https://api.spotify.com/v1/tracks/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };

    const trackFeatures = await rp(trackFeaturesOptions)
    const track = await rp(trackOptions)

    res.send({
        track: JSON.parse(track),
        trackFeatures: JSON.parse(trackFeatures)
    })

});


router.post('/top-tracks', (req, res) => {
    const token = req.body.token
    const id = req.body.id;
    const time = req.body.time
    console.log('top tracks', time);

    const topTracksOptions = {
        url: `https://api.spotify.com/v1/me/top/tracks?time_range=${time}&limit=50`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };

    rp(topTracksOptions).then(response => {
        res.send({ tracks: JSON.parse(response) })
    })
})

module.exports = router