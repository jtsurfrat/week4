// This is my simple sample app in vanilla
// express and javascript

// include the express frameworkd.

const express = require('express');

//Include the mongodb NOdeJs driver

const MongoClient = require('mongodb').MongoClient;

// Create the express app

const app = express ();

// Create a simple shortcut way to acces the database

var db;

MongoClient.connect('mongodb://jtsurfrat:porter566@ds045704.mlab.com:45704/newcrud', function(error,
database) {
  // make sure there are no errors connecting with the DB.
  if(error != null){
    throw error;
  }

  // set database to the shortcut db

  db = database;

  console.log('Successfuly connect to the database');
});


//const connectionString = 'mongodb://jtsurfrat:porter566@ds045704.mlab.com:45704/newcrud';

//Include the middleware / plugin that will parse the body
// data of the the request

const bodyParser = require('body-parser');

// NOTE: make sure to include it for use the app before the route makes use
// of it

app.use(bodyParser.urlencoded({extended: true}));

//NOte The urlend is there to the parse the raw body of the Post data and
// attach the key value pairs to teh request object

//NOTE: The urlencoded is there to the

//Create a simple route will process the request

app.listen(3000, function() {
  console.log('- My app server is runing on port 3000')
})

//Create a simple route to access the express app.

app.get('/', function(request, response) {
  // console.log('- this is my request object: ', request);
  //response.send("hello World");
  response.sendFile(__dirname + '/index.html');
  //       __dirname takes path we are in and use it as a base
});
//to start the server
///node app.ts

// creae route to handle quote Post request

app.post('/quotes', function(request, response) {
  console.log(request.body);

  //save the Post data to the mongo db.
  db.collection('quotes').save(request.body, function(error, result) {

    // check for an erro while trying to save to the database
    if(error != null){
      throw error;
      console.log(error);
      //response.send(error)
    }
    //redirect the user back to the home page at route '/'
    response.redirect('/');
  })



});


















//hi
