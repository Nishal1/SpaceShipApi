const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spaceshipSchema = new Schema(
    {
        name: String,
        model: String,
        status: {
            type: String,
            enum: ['decommissioned', 'maintenance', 'operational'],
            required: true
        }
    }
);

module.exports = mongoose.model('Spaceship', spaceshipSchema);