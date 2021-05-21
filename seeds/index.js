/**
 * This file populates some sampe data to work with for testing purposes
 */
const mongoose = require('mongoose');
const Spaceship = require('../models/spaceship');

const dbUrl = 'mongodb://localhost:27017/spaceship';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const seedDB = async () => {
    await Spaceship.deleteMany({});
    for (let i = 0; i < 25; i++) {
        const spaceship = new Spaceship({
            name: `Spaceship ${i} flyer`,
            model: `modelx-${i}`,
            status: `decommissioned`
        });
        await spaceship.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});