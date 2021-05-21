const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const location = require('../controllers/location');

router
    .route('/') 
    .get(catchAsync(location.index)) //gets all current locations
    .post(catchAsync(location.createLocation)); //adds a location to the database

router.get('/new', location.renderNewForm); //render a form to add location

router
    .route('/:id')
    .get(catchAsync(location.showLocation)) //gets a location info
    .delete(catchAsync(location.deleteLocation)); //sends a delete request to delete the location 

module.exports = router;