const express = require('express');
const app = express();
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// my modeule
const mogooseURL = require('./config/config').mogooseURL;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//passport
app.use(passport.initialize());
require('./config/passport')(passport);
// mongoose
mongoose.connect(mogooseURL, { useNewUrlParser: true})
    .then(() => console.log("connected to mongodb"))
    .catch(err => console.log(err));


app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    })
    next();
})
// localhost:4000/api/passenger/register
app.use('/api/passenger', require('./routes/api/passenger'));
app.use('/api/home', require('./routes/api/index'));
app.use('/api/driver', require('./routes/api/driver'));
app.use('/api/trip', require('./routes/api/trips'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('listening on port' + port);
})