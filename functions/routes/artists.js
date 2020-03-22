const router = require('express').Router();
const rp = require('request-promise');
const keys = require('../secret-keys/env-vars');

router.post('/artist', async (req, res) => {
    const token = req.body.token
    const id = req.body.id;

    const artistOptions = {
        url: `https://api.spotify.com/v1/artists/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };

    const isFollowingOptions = {
        url: `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };

    const artist = await rp(artistOptions)
    const isFollowing = await rp(isFollowingOptions)

    res.send({ artist: JSON.parse(artist), following: isFollowing })
});

router.post('/follow-artist', (req, res) => {
    const token = req.body.token
    const id = req.body.id;


    const followArtistOptions = {
        url: `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`,
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };

    rp(followArtistOptions).then((response) => {
        res.send({ artistResponse: response })
    })
})

router.post('/unfollow-artist', (req, res) => {
    const token = req.body.token
    const id = req.body.id;


    const unfollowArtistOptions = {
        url: `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`,
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };

    rp(unfollowArtistOptions).then((response) => {
        res.send({ artistResponse: response })
    })
})


module.exports = router;