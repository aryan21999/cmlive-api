const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const messageService = require('./message.service');
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');

// routes
router.post('/inbox-strange', authorize(), inboxStrangeSchema, inboxStrange);
router.post('/inbox-follow', authorize(), inboxStrangeSchema, inboxFollow);
router.post('/converstions', authorize(), inboxStrangeSchema, converstions);
router.post('/user-message', authorize(), userMessageSchema, userMessage);
router.post('/delete-message', authorize(), deleteMessageSchema, deleteMessage);

module.exports = router;

function inboxStrangeSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function inboxStrange(req, res, next) {
    messageService.inboxStrange(req.body)
        .then(message => res.json(message))
        .catch(next);
}

function inboxFollow(req, res, next) {
    messageService.inboxFollow(req.body)
        .then(message => res.json(message))
        .catch(next);
}

function converstions(req, res, next) {
    messageService.converstions(req.body)
        .then(message => res.json(message))
        .catch(next);
}

function userMessageSchema(req, res, next) {
    const schema = Joi.object({
        user_from: Joi.number().required(),
        user_to: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function userMessage(req, res, next) {
    messageService.userMessage(req.body)
        .then(message => res.json(message))
        .catch(next);
}

function deleteMessageSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        message_id: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function deleteMessage(req, res, next) {
    messageService.deleteMessage(req.body)
        .then(message => res.json(message))
        .catch(next);
}
