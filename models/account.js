const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    fullname:{
        type: String,
        required: true
    },
    gender:{
      type: Number,
      required: true
    },
    accountType:{
        type: Number, // 1 driver, 2: passenger
        required: true,
        // default: 2
    },
    phone:{
      type: String,
      required: true
    },
    isActive:{
      type: Boolean,
      required: true
    }
})

const  Account = mongoose.model('account', AccountSchema)
module.exports = Account;