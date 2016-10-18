// This is my simple sample app in vanilla
// express and javascript

// include the express frameworkd.

const express = require('express');

// Create the express app

const app = express ();

//Include the middleware / plugin that will parse the body
// data of the the request

const bodyParser = require('body-parser');

// NOTE: make sure to include it for use the app before the route makes use
// of it

app.use(bodyParser.urlencoded({extended: true}));

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
});
















//hi
