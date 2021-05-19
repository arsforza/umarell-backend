const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcrypt');
const mognoose = require('mongoose');

const SALT_ROUNDS = 10;

const User = require('../models/User.model');

authRoutes.post('/signup', (req, res, next) => {
    const { username, password } = req.body;

    if(!username || !password) {
        res.status(400).json({ message: 'Please provide both username and password' });
        return;
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!regex.test(password)) {
        res.status(500).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase, and one uppercase letter' });
        return;
    };

    bcrypt.genSalt((SALT_ROUNDS))
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
        return User.create({
            username,
            password: hashedPassword,
        });
    })
    .then((createdUser) => {
        const { _id, username, createdAt, updatedAt } = createdUser;
        console.log('Newly created user: ', username);
        res.status(200).json({ _id, username, avatar, createdAt, updatedAt });
    })
    .catch((err) => {
        if(err.code === 11000) {
            res.status(500).json({ message: 'Username needs to be unique. Username has already been used' });
        } else {
            next(err);
        }
    })
});

authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if(err) {
            res.status(500).json({ message: 'Something went wrong authenticating the user' });
            return;
        }

        if(!theUser) {
            res.status(401).json(failureDetails);
            return;
        }

        req.login(theUser, (err) => {
            if(err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }

            const { _id, username, avatar } = theUser

            res.status(200).json({ _id, username, avatar });
        });
    })(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});

authRoutes.get('/loggedin', (req, res, next) => {
    if(req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;