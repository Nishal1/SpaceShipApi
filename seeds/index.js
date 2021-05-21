/**
 * This file populates some sampe data to work with for testing purposes
 */
const mongoose = require('mongoose');
const Spaceship = require('../models/spaceship');
const Location = require('../models/location');

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

const seedDBSpaceship = async () => {
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

const seedDBLocation = async() => {
    await Location.deleteMany({});

    for(let i = 1 ; i < 9 ; i++) {
        const location = new Location({
            cityName: `inter planet city# ${i}`,
            planetName: `planet#-${i}`,
            capacity: i*3
        });
        //in the beginning the spaceships present in each planet is accounted to be zero
        await location.save();
    }
}

// seedDBSpaceship().then(() => {
//     mongoose.connection.close();
// });

seedDBLocation().then(() => {
    mongoose.connection.close();
});