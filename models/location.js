const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Spaceship = require('./spaceship');

const locationSchema = new Schema(
    {
        cityName: String,
        planetName: String,
        capacity: Number,
        spaceShips: [{  //array holds space ships in a particular location
            type: Schema.Types.ObjectId,
            ref: 'Spaceship'
        }]
    }
);

module.exports = mongoose.model('Location', locationSchema);