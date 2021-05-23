const Spaceship = require('../models/spaceship');
const Location = require('../models/location');


module.exports.getInfo = async(req, res) => {
    const spaceship = await Spaceship.findById(req.params.sID);
    res.render('spaceships/show', { spaceship });
}

module.exports.travel = async(req, res) => {
    try {
        const spaceship = await Spaceship.findById(req.params.sID);
        const location = await Location.findById(req.params.lID).populate({
            path: 'spaceShips'
        });
    
        if(!location || !spaceship) {
            return res.send('Undefined credentials: Travel Not possible :(');
        }

        if(spaceship.status === "operational" && location.spaceShips.length < location.capacity) {  //ensuring that location has space for a spaceship to be inserted and that spaceship is in operational status

            //extra check to make sure that the new location doesn't have the spaceship
            for(let i = 0; i < location.length; i++) {
                if(location[i].equals(spaceship.currentLocation)) {
                    //insertion not possible as spaceship aldready in this location
                    //redirect to main index as temporary error handling
                    return res.send('Travel Not possible :(');
                }
            }

            if(spaceship.currentLocation) {
                let oldLocation = await Location.findById(spaceship.currentLocation).populate({
                    path: 'spaceShips'
                });
            
                let x = [];
                for(let i = 0; i < oldLocation.spaceShips.length; i++) {
                    if(!oldLocation.spaceShips[i].equals(spaceship)) {
                        x.push(oldLocation.spaceShips[i]);
                    }
                }
                // let x = oldLocation.spaceShips.filter(item => item._id !== spaceship._id);
                oldLocation.spaceShips = x;
                let oldloc = await Location.findByIdAndUpdate(spaceship.currentLocation, oldLocation);
                console.log(oldloc);
                await oldloc.save();
            }
            //at this stage insertion is possible
            spaceship.currentLocation = location; //set to new location
            location.spaceShips.push(spaceship);    //add spaceship to new location

            await location.save();
            await spaceship.save();
            
            return res.send("successful Travel");
        
        } else {
            //travelling not possible as travel conditions are not met
            //redirect to main index as temporary error handling
            return res.send('Travel Not possible :(');
        }
    } catch(e) {
        res.status(500).send('Something went wrong');
    }

}