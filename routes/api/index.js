const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// load model
const Account = require('../../models/account');
const Passenger = require('../../models/passenger');


router.get('/', (req, res) => {
    res.json({msg: 'succes'});
})

// route POST localhost:4000/api/home/login
// decs  login
// access public
router.post('/login' ,(req, res) =>{
    let {email, password} = req.body;
    Account.findOne({email: email})
        .then(account =>{
            if (account){
                bcrypt.compare(password, account.password)
                    .then(isMatch =>{
                        if (isMatch){
                            // return res.json({msg: "login success"})

                            const payload = {
                                email: email,
                                id: account._id,
                                phone: account.phone,

                            }
                            jwt.sign(payload, 'secret', {expiresIn: 3600},(err, token) => {
                                if (err) return console.log(err);
                                res.json({
                                    payload,
                                    account,
                                    success: true,
                                    token: 'Bearer ' + token

                                })
                            })
                        } else {
                            res.json({msg:"sai roi may"})
                        }
                    })
            } else {
                return res.json({msg: "login does exit"});
            }
        })
})


module.exports = router;