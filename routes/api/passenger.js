const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const validPassengerRegister = require('../../validation/passengerRegister');

// load model
const Account = require('../../models/account');
const Passenger = require('../../models/passenger');


router.get('/', (req, res) => {
    res.json({msg: 'succes'});
})

// route POST localhost:4000/api/passenger/register
// decs  rehister new account
// access public

router.post('/register', (req, res) => {
    const {errors, isValid} = validPassengerRegister(req.body);
    if (!isValid){
        return res.status(400).json(errors);
    }


    const {email, password, fullname, gender, phone, birthday} = req.body
    Account.findOne({email: email})
        .then(account => {
            if (account) {
                return res.json({msg: 'Email does exits'})
            } else {
                return Account.findOne({phone: phone})
            }
        })
        .then(phone => {
            if (phone) {
                return res.json({msg: 'Phone does exits'})
            } else {
                const newAccount = new Account({
                    email, password, fullname, gender, accountType: 2, isActive: true,
                    phone: req.body.phone
                })
                newAccount.save()
                // .then(account => res.json({account}))

                // const newPassenger = new Passenger({})

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) return console.log(err);
                    bcrypt.hash(newAccount.password, salt, (err, hash) => {
                        if (err) return console.log(err);
                        newAccount.password = hash;
                        newAccount.save()
                            .then(account => {
                                const newPassenger = new Passenger({
                                    accountID: account._id,
                                    birthday,
                                    registerday: new Date().getTime(),
                                    numberOfTrips: 0
                                })
                                newPassenger.save()
                                    .then(passenger => {
                                        res.json({account, passenger})
                                    })
                            })
                    })
                })
            }
        })
        .catch(err => console.log(err));
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user._id,
        email: req.user.email,
        fullname: req.user.fullname,
        gender: req.user.gender,
        accountType: req.user.accountType,
        isActive: req.user.isActive
    })
})

//edit

router.post('/edit', passport.authenticate('jwt', {session: false}), (req, res) => {
    let{email, password, fullname, gender, phone, birthday} = req.body;
    Account.findById(req.user._id)
    .then(account => {
        if(account){
            account.email = email,
            account.password = password,
            account.fullname = fullname,
            account.gender = gender,
            account.phone = phone,

            account.save()
            .then(account => res.json(account))
            .catch(err => console.log(err))
        }
    })
})


module.exports = router;