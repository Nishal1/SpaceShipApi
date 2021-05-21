const Spaceship = require('../models/spaceship');

module.exports.index = async (req, res) => {
    const spaceships = await Spaceship.find({});
    res.render('spaceships/index', { spaceships });
}

module.exports.renderNewForm = (req, res) => {
    res.render('spaceships/new');
}

module.exports.createSpaceShip = async(req, res) => {
    const spaceship = new Spaceship(req.body.spaceship);
    await spaceship.save();
    res.redirect('/spaceships')
}

module.exports.showSpaceship = async(req, res) => {
    const spaceship = await Spaceship.findById(req.params.id);
    res.render('spaceships/show', { spaceship });
}