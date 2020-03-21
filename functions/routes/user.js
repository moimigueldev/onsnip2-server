const router = require('express').Router();


router.post('/user-dashboard', (req, res) => {
    console.log('req', req.body)

    res.send({ ok: 'ok' })
})


module.exports = router;
