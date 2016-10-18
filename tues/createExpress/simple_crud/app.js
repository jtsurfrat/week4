// This is my simple sample app in vanilla
// express and javascript

// include the express frameworkd.

const express = require('express');

// Create the express app

const app = express ();

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
















//hi
