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

// Set the HTML rendering template engine that express should use;
app.set('view engine', 'ejs');

//tell express where public static content is at
app.use(express.static('public'));

app.listen(3000, function() {
  console.log('- My app server is runing on port 3000')
})

//Create a simple route to access the express app.

app.get('/', function(request, response) {

//craet a cursor to the data inside mongodb . This is
// so you can grab data with in a range for future queries
    var cursor = db.collection('quotes').find();
    var list = cursor.toArray(function(error, result) {
        response.render('index.ejs', {
            result: result,
            data: {
                name: 'bob',
                list: [
                    'sarah',
                    'jon',
                    'steve',
                    'ray'
                ],
                productList: [
                    {
                        name: 'bookbag',
                        description: 'for school',
                        price: '5.99'
                    },
                    {
                        name: 'computer',
                        description: 'for doing web stuff',
                        price: '$2,000.00'
                    },
                    {
                        name: 'computer2',
                        description: 'for science',
                        price: '$1,000.00'
                    }

                ]
            }
         })
    });
  // console.log('- this is my request object: ', request);
  //response.send("hello World");
  //response.sendFile(__dirname + '/index.html');
  //       __dirname takes path we are in and use it as a base

  // send the render data file




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


//Create a route for the '/quotes' using PUT method

app.put('/quotes', function(request, response) {
    console.log(response.body);

    db.collection('quotes').findOneAndUpdate(
        // Tell Mongo what to filter by
        // essentially find anything with name of 'Yoda'
        {
            name: 'Yoda'
        },
        // pass a js literal object to manage how to update
        // the found object
        {
            // set / replace the data on the found item.
            $set: {
                name: request.body.name,
                quote: request.body.quote
            }
        },

        //Force the quote to be inserted if a match is not found on database
        {
            sort: {id: -1}, // not item found because 'id ' is invalid or -1
            upsert: true  // set 'upsert to be true' so data is insert any if nothing
                                // is actually found
        },
// callback function for when the query is done
        function(error, result){
            if(error){
                throw error;
                return;
            }
            response.send(result);
        }
    )
});

// findOneDelete
// finds first darthVader and delets
app.delete('/quotes', function(request, response) {
    console.log(response);
    db.collection('quotes').findOneAndDelete(
        {
            name: 'Darth Vader'
        },
        function(error, result){
            if(error){
                throw error;
                return
            }
            response.send(result);
        }
    );
});


















//hi
