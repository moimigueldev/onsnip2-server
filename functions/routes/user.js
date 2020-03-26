const router = require('express').Router();
const rp = require('request-promise');
const keys = require('../secret-keys/env-vars');



router.post('/user-dashboard', async (req, res) => {
    const token = req.body.token

    const playlistOptions = {
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };
    const featuredPlaylistOptions = {
        url: 'https://api.spotify.com/v1/browse/featured-playlists?limit=10',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };

    const userOptions = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };
    const newReleasesOptions = {
        url: '	https://api.spotify.com/v1/browse/new-releases?limit=10',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };
    const topArtistOptions = {
        url: 'https://api.spotify.com/v1/me/top/artists?limit=10',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': keys.cors['spotify-header']
        }
    };



    let user = await rp(userOptions).catch((err) => {
        res.send({ err: "access token expired" })
    })
    let playlistCount = await rp(playlistOptions).catch((err) => {
        res.send({ err: "access token expired" })
    })
    let featuredPlaylist = await rp(featuredPlaylistOptions).catch((err) => {
        res.send({ err: "access token expired" })
    })
    let newReleases = await rp(newReleasesOptions).catch((err) => {
        res.send({ err: "access token expired" })
    })
    let topArtist = await rp(topArtistOptions).catch((err) => {
        res.send({ err: "access token expired" })
    })

    playlistCount = JSON.parse(playlistCount)



    res.send({
        profile: JSON.parse(user),
        playlist: playlistCount,
        featuredPlaylist: JSON.parse(featuredPlaylist),
        newReleases: JSON.parse(newReleases),
        topArtists: JSON.parse(topArtist)
    })

})


module.exports = router;
