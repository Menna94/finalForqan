const express = require('express'),
router = express.Router();

const {
    getAllRecipients,
    getSingleRecipient,
    addRecipient,
    updateRecipient,
    deleteRecipient
} = require('../Controllers/recipient.controller');
const filter = require('../Middlewares/advancedFilters.middleware');
const Recipient = require('../Models/recipient.model');

//Fetch Recipients
//GET /api/v1/recipients
router.get('/', filter(Recipient), getAllRecipients);

//Fetch Single Recipient
//GET /api/v1/recipients/:id
router.get('/:id', getSingleRecipient);

//Create Recipient
//POST /api/v1/recipients
router.post('/', addRecipient);


//Update Recipient
//PUT /api/v1/recipients/:id
router.put('/:id', updateRecipient);

//Delete A Recipient
//DELETE /api/v1/recipients/:id
router.delete('/:id', deleteRecipient)

module.exports = router;