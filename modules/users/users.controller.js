const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize');
const userService = require('./user.service');
const { endUrl } = require('config.js');

// routes
router.post('/login', authenticateSchema, authenticate);
router.post('/google-login', googleAuthenticateSchema, googleAuthenticate);
router.post('/code-login', codeAuthenticateSchema, codeAuthenticate);
router.post('/reset-password', resetPasswordSchema, resetPassword);
router.post('/register', registerSchema, register);
router.get('/current', authorize(), getCurrent);
router.put('/update', authorize(), updateSchema, update);
router.put('/update-user-live-status', authorize(), updateUserLiveStatusSchema, updateUserLiveStatus);
router.post('/check-phone-number', authorize(), checkPhoneSchema, checkPhone);
router.get('/random-users', authorize(), randomUsers);
router.get('/:id', authorize(), getById);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        device_token: Joi.string().required(),
        phone_number: Joi.string().required(),
        password: Joi.string().required(),
        device_name: Joi.string().required(),
        log_time: Joi.string().required(),
        location: Joi.string().required(),
        advertising_id: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function googleAuthenticateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        advertising_id: Joi.string().required(),
        device_token: Joi.string().required(),
        device_name: Joi.string().required(),
        log_time: Joi.string().required(),
        location: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function googleAuthenticate(req, res, next) {
    userService.googleAuthenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function codeAuthenticateSchema(req, res, next) {
    const schema = Joi.object({
        device_token: Joi.string().required(),
        phone_number: Joi.string().min(10).required(),
        device_name: Joi.string().required(),
        log_time: Joi.string().required(),
        location: Joi.string().required(),
        advertising_id: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function codeAuthenticate(req, res, next) {
    userService.codeAuthenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        phone_number: Joi.string().min(10).required(),
        password: Joi.string().min(6).required(),
        dob: Joi.string().min(10).required(),
        gender: Joi.string().min(4).required(),
        device_token: Joi.string().required(),
        advertising_id: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function resetPasswordSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        newpassword: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}

function resetPassword(req, res, next) {
    userService.update({ user_id: req.body.user_id }, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function getCurrent(req, res, next) {
    const user = req.user;
    user.user_id = user.id;
    user.live_image_url =  user.live_image ? `${endUrl}image_gallery/user/${user.live_image}` : `${endUrl}image_gallery/user/blank.png`;
    user.profile_image_url =  user.profile_image ? `${endUrl}image_gallery/user/${user.profile_image}` : `${endUrl}image_gallery/user/blank.png`;
    res.json(user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        name: Joi.string().min(3).required(),
        dob: Joi.string().min(10).required(),
        gender: Joi.string().min(4).required(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update({ user_id: req.body.user_id }, {
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender
    })
        .then(user => res.json(user))
        .catch(next);
}

function updateUserLiveStatusSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        channel_name: Joi.string().min(3).required(),
        live_status: Joi.string().required(),
        live_title: Joi.string().min(3).required(),
        live_category: Joi.string().required(),
        live_location: Joi.string().required(),
        live_mode: Joi.string().required(),
        live_time: Joi.string().required(),
        pk_diamonds: Joi.string().required(),
        live_hosts: Joi.string().required(),
        match_mode: Joi.string().required(),
        send_notification: Joi.string().required(),
        live_uid: Joi.string().required(),
        total_diamonds: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function updateUserLiveStatus(req, res, next) {
    userService.updateUserLiveStatus(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function checkPhoneSchema(req, res, next) {
    const schema = Joi.object({
        phone_number: Joi.string().min(10).required(),
    });
    validateRequest(req, next, schema);
}

function checkPhone(req, res, next) {
    userService.checkPhone(req.body)
        .then(user => user.user_detail ? res.status(400).json(user) : res.json(user))
        .catch(next);
}

function randomUsers(req, res, next) {
    userService.randomUsers()
        .then(users => res.json(users))
        .catch(next);
}