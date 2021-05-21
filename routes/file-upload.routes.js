const express = require('express');
const fileUploadRoutes = express.Router();
const fileUploader = require('../configs/cloudinary.config');

// fileUploadRoutes.post('/uploadavatar', fileUploader.single('avatar'), (req, res, next) => {
//     if(!req.file) {
//         next(new Error('No file uploaded!'));
//         return;
//     }

//     res.status(200).json({ secure_url: req.file.path })
// })

fileUploadRoutes.post('/upload', fileUploader.array('image', 10), (req, res, next) => {
    if(!req.files) {
        next(new Error('No file uploaded!'));
        return;
    }

    res.status(200).json({ files: req.files })
})

module.exports = fileUploadRoutes;