const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validPassengerRegister(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password: "";
    data.confirmedpassword = !isEmpty(data.confirmedpassword) ? data.confirmedpassword: "";
    data.fullname = !isEmpty(data.fullname) ? data.fullname: "";
    data.phone = !isEmpty(data.phone) ? data.phone: "";
    data.birthday = !isEmpty(data.birthday) ? data.birthday: "";


    if (validator.isEmpty(data.email)){
        errors.email = 'Email is reuire'
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'EMail is valid'
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'password is valid'
    }
    if(!validator.isLength(data.password, {min:6})){
        errors.password = 'nhap du 6 ki tu nha may'
    }
    if(validator.isEmpty(data.confirmedpassword)){
        errors.confirmedpassword = 'confirmedpassword is valid'
    }
    if(!validator.equals(data.password, data.confirmedpassword)){
        errors.confirmedpassword = 'password is match'
    }
    if(validator.isEmpty(data.fullname)){
        errors.fullname = 'fullname is valid'
    }
    if(validator.isEmpty(data.phone)){
        errors.phone = 'EMail is valid'
    }
    if(!validator.isLength(data.phone, {min:10})){
        errors.phone = 'nhap du 10 ki tu nha may'
    }
    if(validator.isEmpty(data.birthday)){
        errors.birthday = 'birthday is valid'
    }


    return{
        errors,
        isValid: isEmpty(errors)
    }
}