const express = require('express');
const forumRoutes = express.Router();

const User = require('../models/User.model');
const ForumThread = require('../models/ForumThread.model.js');
const ForumPost = require('../models/ForumPost.model.js');
const mongoose = require('mongoose');

forumRoutes.get('/forum', (req, res, next) => {
    ForumThread.find({})
    .populate('user', 'username')
    .then((forum) => {
        res.status(200).json(forum);
    })
    .catch((err) => {
        res.status(500).json(err);
        next(err);
    });
});

forumRoutes.get('/thread/:id', (req, res, next) => {
    const { id } = req.params;

    ForumThread.findById(id)
    .populate('user', ['_id', 'username'])
    .populate({
        path: 'posts',
        populate: {
            path: 'user',
            select: ['_id', 'username', 'avatar'],
        },
    })
    .then((thread) => {
        res.status(200).json(thread);
    })
    .catch((err) => console.error(err));
});

forumRoutes.post('/thread', (req, res, next) => {
    const { title, user, lat, lon } = req.body;

    ForumThread.create({
        title,
        user,
        posts: [],
        lat,
        lon,
    })
    .then((thread) => {
        res.status(200).json(thread);
    })
    .catch((err) => console.error(err));
});

forumRoutes.get('/post/:id', (req, res, next) => {
    const { id } = req.params;

    ForumPost.findById(id)
    .then((post) => {
        res.status(200).json(post);
    })
    .catch((err) => console.error(err));
});

forumRoutes.put('/thread/:id', (req, res, next) => {
    const { id } = req.params;
    const { postId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    ForumThread.findByIdAndUpdate(id, {$addToSet: {posts: postId}})
    .then(() => {
        res.status(200).json({ message: `Thread with id ${id} updated succesfully` });
    })
    .catch((err) => {
        res.status(500).json(err);
        next(err);
    });
});

forumRoutes.post('/post', (req, res, next) => {
    const { user, content, thread } = req.body;

    ForumPost.create({
        user,
        images: [],
        content,
        thread,
    })
    .then((post) => {
        res.status(200).json(post);
    })
    .catch((err) => console.error(err));
});

forumRoutes.get('/user/:id', (req, res, next) => {
    const { id } = req.params;

    User.findById(id)
    .then((user) => {
        const { _id, username, avatar } = user;
        res.status(200).json({ _id, username, avatar });
    })
    .catch((err) => console.error(err));
});

forumRoutes.put('/changeavatar', (req, res, next) => {
    const {userId, imgUrl} = req.body;

    User.findByIdAndUpdate(userId, { avatar: imgUrl })
    .then((user) => {
        const { _id, username, avatar } = user;
        res.status(200).json({ _id, username, avatar });
    })
    .catch((err) => console.error(err));

})

module.exports = forumRoutes;