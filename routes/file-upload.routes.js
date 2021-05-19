const express = require('express');
const fileUploadRoutes = express.Router();
const fileUploader = require('../configs/cloudinary.config');



fileUploadRoutes.post('/uploadimg', fileUploader.single('avatar'), (req, res, next) => {
    if(!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }

    res.status(200).json({ secure_url: req.file.path })
})

module.exports = fileUploadRoutes;