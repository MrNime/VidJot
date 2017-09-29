const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const passport = require('passport');
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

// Register form POST
router.post('/register', (req, res) => {
    let errors = [];

    if (req.body.password !== req.body.password2) {
        errors.push({ text: 'Passwords do not match' });
    }
    if (req.body.password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
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
                console.log(newUser);
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
    }
});

module.exports = router;
