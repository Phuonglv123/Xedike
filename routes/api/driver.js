const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// load model
const Account = require('../../models/account');
const Passenger = require('../../models/passenger');
const Driver = require('../../models/driver');


// test
router.get('/', (req, res) => {
    res.json({ msg: 'success' })
})

// route    POST localhost:5000/api/passengers/register
// desc     register new account
// access   PUBLIC
router.post('/register', (req, res) => {
    const { email, password, fullname, gender, phone } = req.body
    Account.findOne({ email: email })
        .then(account => {
            if(account){
                res.json({ msg: "Email does exist" })
            } else {
                return Account.findOne({ phone: phone })
            }
        })
        .then(phone => {
            if(phone){
                res.json({ msg: "Phone does exist" })
            } else {
                const newAccount = new Account({
                    email, password, fullname, gender,
                    accountType: 2,
                    isActive: true,
                    phone: req.body.phone
                })  

                bcrypt.genSalt(10, (err, salt) => {
                    if(err) return console.log(err);
                    bcrypt.hash(newAccount.password, salt, (err, hash) => {
                        if(err) return console.log(err);
                        newAccount.password = hash;
                        newAccount.save()
                            .then(account => {
                                res.json({ account })
                            })
                    })
                })
            }
        })
        .catch(err => console.log(err));
        
})

// route    POST localhost:5000/api/passengers/register
// desc     register new account
// access   PUBLIC

router.post('/detail', passport.authenticate('jwt', {session:false}), (req,res) => {
    const id = req.user.id;
    const { birthday, address, passportID, company, model, carInfo, manufacturingYear, licensePlate, numberOfSeats} = req.body;
    Driver.findOne({accountID: id})
    .then(account =>{
        if(account){
            return res.json({msg: "Accounr da co"})
        } else{
            let carInfo = {};
            carInfo = {...carInfo, model, manufacturingYear, licensePlate, numberOfSeats}
            const newDriver = new Driver({
                accountID: id,
                birthday, address, passportID, company, registerDate: new Date().getTime(),
                numberOfTrips: 0,
                carInfo
            })
            newDriver.save()
            .then(driver => res.json({driver}))
            .catch(err => console.log(err));
        }
    })
})

// route    POST localhost:5000/api/driver/:id
// desc     register new account
// access   PUBLIC



module.exports = router;