const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


// load model
const Account = require('../../models/account');
const Passenger = require('../../models/passenger');
const Driver = require('../../models/driver');
const Trip = require('../../models/trips');


router.get('/', (req, res) => {
    Trip.find()
    .then(trips => {
        if (trips.length !==0) {
            console.log(trips)
            res.json({trips})
        }else{
            res.json({msg: "there is no trip"})
        }
    })
    .catch(err => console.log(err))
})


// route POST localhost:4000/api/trip/create-trip
// decs  rehister new account
// access public

router.post('/create-trip', passport.authenticate('jwt', {session: false}), (req, res) => {
    const id = req.user.id;
    const {locationFrom, locationTo, startTime, availableSeats, wifi, music, pet, food, drink, wetTowel} = req.body;
    Driver.findOne({accountID: id})
    .then(driver => {
        if (driver) {
            let options = {wifi, music, pet, food, drink, wetTowel}
            const newTrip = new Trip({
                driverID: driver._id,
                locationFrom, locationTo, startTime, availableSeats,
                options,
                finish: false
            })
            newTrip.save()
            .then(trips => res.json(trips))
            .catch(err => console.log(err))
        }
    })
    .catch( err => console.log(err));
})
module.exports = router;