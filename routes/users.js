const express = require('express');
const router = express.Router();

// User Login route
router.get('/login', (req, res) => {
    res.render('users/login');
});

// User Register route
router.get('/register', (req, res) => {
    res.render('users/register');
});

module.exports = router;
