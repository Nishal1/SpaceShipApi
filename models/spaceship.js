const mongoose = require('mongoose');
const Location = require('./location');
const Schema = mongoose.Schema;

const spaceshipSchema = new Schema(
    {
        name: String,
        model: String,
        status: {
            type: String,
            enum: ['decommissioned', 'maintenance', 'operational'],
            required: true
        },
        currentLocation: {  // holds current location
            type: Schema.Types.ObjectId,
            ref: 'Location'
        }
    }
);

module.exports = mongoose.model('Spaceship', spaceshipSchema);