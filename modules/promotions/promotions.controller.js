const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const promotionService = require('./promotion.service');
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');

// routes
router.get('/', authorize(), getAll);
router.get('/detail', authorize(), detailSchema, getById);

module.exports = router;

function getAll(req, res, next) {
    promotionService.getAll()
        .then(banners => res.json(banners))
        .catch(next);
}

function detailSchema(req, res, next) {
    const schema = Joi.object({
        promotion_id: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function getById(req, res, next) {
    promotionService.getById(req.body.promotion_id)
    .then(banner => res.json(banner))
    .catch(next);
}
