const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const travel = require('../controllers/travel');

router
    .route('/')
    .get(catchAsync(travel.getInfo)) //gets travel info
    .post(catchAsync(travel.travel)); //sends a post request to Travel between locations


module.exports = router;