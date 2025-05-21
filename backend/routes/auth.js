const express = require('express');
const { registerUser } = require('../controllers/authController');
Router.route('/register').post(registerUser);

module.exports = router;