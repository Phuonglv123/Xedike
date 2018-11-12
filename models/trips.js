const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    driverID: { type: String, required: true },
    locationFrom: { type: String, required: true },
    locationTo: { type: String, required: true },
    startTime: { type: Date, required: true },
    options: {
        wifi: { type: Boolean, required: true },
        music: { type: Boolean, required: true },
        pet: { type: Boolean, required: true },
        food: { type: Boolean, required: true },
        drink: { type: Boolean, required: true },
        wetTowel: { type: Boolean, required: true }
    },
    availableSeats: { type: Number, required: true },
    fee: {type: Number},
    passengers: [{
        passengerID: {type: String},
        locationGetIn: {type: String}, 
        locationGetOff: {type: String}, 
        paymentMethod: {type: String},
        numberOfBookingSeats: {type: Number},
        notes: {type: String},
    }],
    finish: { type: Boolean, required: true },
    // isBooked: { type: Boolean, required: true }
})

const Trip = mongoose.model('trips', TripSchema);
module.exports = Trip;