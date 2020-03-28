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



    // const artist = await rp(artistOptions).catch((err) => {
    //     return res.status(500)
    //     // res.send({ err: "access token expired" })
    // })
    // const isFollowing = await rp(isFollowingOptions).then(response => {
    //     return res.send({ artist: JSON.parse(artist), following: response })
    // }).catch((err) => {
    //     return res.status(500)
    // })

    const artist = await rp(artistOptions)
        .then(response => {
            return JSON.parse(response)
        })
        .catch((err) => {
            return false
        })
    const isFollowing = await rp(isFollowingOptions).then(response => {
        return response

    }).catch((err) => {
        return false
    })

    if (artist && isFollowing) {
        res.send({ artist, following: isFollowing })
    } else {
        res.sendStatus(500)
    }

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
    }).catch((err) => {
        res.send({ err: "access token expired" })
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
    }).catch((err) => {
        res.send({ err: "access token expired" })
    })
});


router.post('/top-artists', (req, res) => {
    const token = req.body.token

    const time = req.body.time


    const topArtistOptions = {
        url: `https://api.spotify.com/v1/me/top/artists?time_range=${time}&limit=50`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };

    rp(topArtistOptions).then(response => {
        res.send(JSON.parse(response))
    }).catch((err) => {
        res.send({ err: "access token expired" })
    })
})


module.exports = router;