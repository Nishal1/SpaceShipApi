const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const travels = require('../controllers/travel');

router
    .route('/')
    .get(catchAsync(travels.getInfo)) //gets travel info
    .post(catchAsync(travels.travel)); //sends a post request to Travel between locations


module.exports = router;