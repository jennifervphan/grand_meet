var express = require('express');
var router = express.Router();
const chatkit = require('./chatkit');

router.post('/share', (req, res) => {
    const userId = req.query.user_id;

    chatkit.createUser({
            id: userId,
            name: userId
        })
        .then(() => {
            const authData = chatkit.authenticate({
                userId: userId,
            });
            debugger
            console.log(authData)
            res.status(authData.status).send(authData.body);
        })
        .catch((err) => {
            console.log(err)
        })
});

module.exports = router;