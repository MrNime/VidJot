const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// Load user Model
require('../models/User');
const User = mongoose.model('users');

// User Login route
router.get('/login', (req, res) => {
    res.render('users/login');
});

// User Register route
router.get('/register', (req, res) => {
    res.render('users/register');
});

// Login form POST
router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/users/login',
        failureFlash: true
    }),
    (req, res, next) => {
        req.flash('success_msg', `Welcome ${req.user.name}!`);
        res.redirect('/ideas');
    }
);

// Register form POST
router.post('/register', (req, res) => {
    let errors = [];

    if (req.body.password !== req.body.password2) {
        errors.push({ text: 'Passwords do not match' });
    }

    if (req.body.password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }

    let dupeMail = User.findOne({ email: req.body.email });
    let dupeName = User.findOne({ name: req.body.name });
    Promise.all([dupeMail, dupeName])
        .then((array) => {
            if (array[0]) {
                errors.push({ text: 'Email already registered' });
            }
            if (array[1]) {
                errors.push({ text: 'Name already taken' });
            }
            if (errors.length > 0) {
                res.render('users/register', {
                    errors: errors,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    password2: req.body.password2
                });
            } else {
                let newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                };
                bcrypt.genSalt(10, (err, salt) => {
                    // linter expects error to be handled
                    if (err) {
                        console.log(err);
                    }
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        newUser.password = hash;
                        new User(newUser)
                            .save()
                            .then(idea => {
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/users/login');
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                });
            };
        });
});

// Logout user
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;
