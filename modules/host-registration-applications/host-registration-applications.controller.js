const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const hostRegistrationSchemaService = require('./host-registration-application.service');
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');

// routes
router.post('/check-last-host-registration', authorize(), checkLastHostRegistrationSchema, checkLastHostRegistration);

module.exports = router;

function checkLastHostRegistrationSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function checkLastHostRegistration(req, res, next) {
    hostRegistrationSchemaService.checkLastHostRegistration(req.body)
        .then(message => res.json(message))
        .catch(next);
}