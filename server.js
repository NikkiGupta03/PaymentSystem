const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path')
const app = express()
var cors = require('cors')

//const stripe = require('stripe')(Secret_Key)

const port = process.env.PORT || 4000
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// View Engine Setup 
app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'ejs')

// const dbConfig = require('./server/config/config');


// mongoose.Promise = global.Promise;

// Connecting to the database
// mongoose.connect(dbConfig.url, {
//   useNewUrlParser: true
// }).then(() => {
//   console.log("Successfully connected to the database");
// }).catch(err => {
//   console.log('Could not connect to the database. Exiting now...', err);
//   process.exit();
//});

require('./server/routes/router')(app);
app.get('/', (req, res) => {
  res.json({ "message": "HrMagmt api using nodejs" });
});app.listen(port, function (error) {
  if (error) throw error
  console.log("Server created Successfully")
})



//hint https://stripe.com/docs/payments/accept-a-payment
