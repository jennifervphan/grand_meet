const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadCloud = require('../configs/cloudinary');
const User = require('../models/user-model');

router.post('/edit', uploadCloud.single('picture'), (req, res, next) => {
    const username = req.body.username;
    const about = req.body.about;
    const user = req.body.user;
    console.log(req.session.user);
    User.findOne({ _id: user })
        .then(user => {
            console.log(user);
            let userId = user._id;
            let updateUser = {
                username: username,
                about: about,
                profilePicUrl: req.file.url,
                profilePicName: req.file.originalname
            }
            User.findByIdAndUpdate(userId, updateUser, { new: true })
                .then(updatedUser => {
                    res.status(200).json(updatedUser);
                })
        })
})

module.exports = router;