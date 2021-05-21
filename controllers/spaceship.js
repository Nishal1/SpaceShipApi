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

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const spaceship = await Spaceship.findById(id);
    res.render('spaceships/edit', { spaceship });
};

module.exports.updateSpaceship = async (req, res) => {
    const spaceship = await Spaceship.findByIdAndUpdate(req.params.id, req.body.spaceship);
    
    await spaceship.save();
    res.redirect(`/spaceships/${spaceship._id}`);
};

module.exports.deleteSpaceships = async (req, res) => {
    const { id } = req.params;
    await Spaceship.findByIdAndDelete(id);
    res.redirect('/spaceships');
}