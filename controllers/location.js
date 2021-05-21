const Location = require('../models/location');

module.exports.index = async (req, res) => {
    const locations = await Location.find({});
    res.render('location/index', { locations });
}

module.exports.renderNewForm = (req, res) => {
    res.render('location/new');
}

module.exports.createLocation = async(req, res) => {
    const location = new Location(req.body.location);
    await location.save();
    res.redirect('/location');
}

module.exports.deleteLocation = async (req, res) => {
    const { id } = req.params;
    await Location.findByIdAndDelete(id);
    res.redirect('/location');
}

module.exports.showLocation = async(req, res) => {
    const location = await Location.findById(req.params.id);
    res.render('location/show', { location });
}