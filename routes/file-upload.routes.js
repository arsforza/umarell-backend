const express = require('express');
const fileUploadRoutes = express.Router();
const fileUploader = require('../configs/cloudinary.config');

fileUploadRoutes.post('/upload', fileUploader.array('image', 10), (req, res, next) => {
    if(!req.files) {
        next(new Error('No file uploaded!'));
        return;
    }

    res.status(200).json({ files: req.files })
})

module.exports = fileUploadRoutes;