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

    const trackFeatures = await rp(trackFeaturesOptions).then(response => {
        return JSON.parse(response)
    }).catch((err) => {
        return false
    })
    const track = await rp(trackOptions).then(response => {
        return JSON.parse(response)
    }).catch((err) => {
        return false
    })

    trackFeatures && track ? res.send({
        track: track,
        trackFeatures: trackFeatures
    }) : res.sendStatus(500)



});


router.post('/top-tracks', (req, res) => {
    const token = req.body.token
    const id = req.body.id;
    const time = req.body.time

    const topTracksOptions = {
        url: `https://api.spotify.com/v1/me/top/tracks?time_range=${time}&limit=50`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };

    rp(topTracksOptions).then(response => {
        return res.send({ tracks: JSON.parse(response) })
    }).catch((err) => {
        return res.sendStatus(500)
    })
})

router.post('/recent-tracks', (req, res) => {
    const token = req.body.token

    const recentTracksOptions = {
        url: `https://api.spotify.com/v1/me/player/recently-played`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };

    rp(recentTracksOptions).then(response => {
        return res.send({ tracks: JSON.parse(response) })
    }).catch((err) => {
        return res.sendStatus(500)
    })
})

module.exports = router