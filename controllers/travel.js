const Spaceship = require('../models/spaceship');
const Location = require('../models/location');


module.exports.getInfo = async(req, res) => {
    const spaceship = await Spaceship.findById(req.params.sID);
    res.render('spaceships/show', { spaceship });
}

module.exports.travel = async(req, res) => {
    const spaceship = await Spaceship.findById(req.params.sID);
    const location = await Location.findById(req.params.lID);
    
    
    if(spaceship.status === "operational" && location.spaceShips.length < location.capacity) {  //ensuring that location has space for a spaceship to be inserted and that spaceship is in operational status
        
        for(let i = 0; i < location.spaceShips.length; i++) {
            if(location[i].equals(spaceship.currentLocation)) {
                //insertion not possible as spaceship aldready in this location
                //redirect to main index as temporary error handling
                return res.render('spaceships/show', { spaceship });
            }
        }
        //at this stage insertion is possible
        spaceship.currentLocation = req.params.lID; //set to new location
        location.spaceShips.push(spaceship);    //add spaceship to new location

        await location.save();
        await spaceship.save();
        return res.render('location/show', { location });
       
    } else {
        //travelling not possible as travel conditions are not met
        //redirect to main index as temporary error handling
        return res.send(location);
    }

}