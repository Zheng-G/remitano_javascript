const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  var allowedOrigins = ['https://remitano-e1e18.firebaseapp.com', 'http://localhost:3000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());

app.post('/', (req, res) => {
  const soTaiKhoan = req.body.soTaiKhoan;
  if (isNaN(soTaiKhoan) || soTaiKhoan.length < 13) {
    res.status(400).send({
      message: 'Invalid account'
    });
  } else {
    res.send({
      userName: 'TRAN HUU LOC'
    })
  }
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.validate = functions.https.onRequest(app);