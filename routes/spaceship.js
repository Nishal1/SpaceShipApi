const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const spaceships = require('../controllers/spaceship');
const Spaceship = require('../models/spaceship');

router
    .route('/') 
    .get(catchAsync(spaceships.index)) //gets all current spaceships
    .post(catchAsync(spaceships.createSpaceShip)); //adds a spaceship to the database

router.get('/new', spaceships.renderNewForm); //render a form to add spaceship

router
    .route('/:id')
    .get(catchAsync(spaceships.showSpaceship)) //gets a spaceship info
//     .put(catchAsync(spaceships.updateSpaceship)) //sends a put request to update the spaceship status
//     .delete(catchAsync(spaceships.deleteSpaceships)); //sends a delete request to delete the spaceship 

// router.get('/:id/edit', catchAsync(spaceships.renderEditForm)); //renders the form to update the spaceship status



module.exports = router;