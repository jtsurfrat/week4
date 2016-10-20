//
// - Morning Assignment
//    - Create a new project
//        - Call simple-login.
//        - Create the git project and host it on Github.
//        - Create a package.json to store project dependencies.
//        - Install express
//        - Install the express middleware
//        - Install the mongo client driver
//        - Install the ejs templating
//        - Create routes for
//            - GET /
//            - GET /login
//            - POST /login
//            - GET /signup
//            - POST /signup
//            - GET /profile
//                - Note that the profile page will not use cookies or a session
//                - The route should detect a proper or in proper login and redirect to an:
//                    - /profile
//                    or
//                    - /error
//            - GET /error

// mongodb://jtsurfrat:porter566@ds059496.mlab.com:59496/login

const express = require('express');

const session = require('express-session');

const MongoClient = require('mongodb').MongoClient;

const app = express ();
// setup session for use by the express
app.use(session ({
  secret: 'this is my secret code',
  resave: false,
  saveUninitialized: true
}));

var db;

MongoClient.connect('mongodb://jtsurfrat:porter566@ds059496.mlab.com:59496/login',
function(error, database) {
  if(error != null){
    throw error;
  }
  db = database;

  console.log('Successful connection to the database');
  app.listen(3000, function() {
    console.log('App started on port 5000');
  })


});

const bodyParser = require('body-parser');

// const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


app.use(express.static('public'));

// Route get home
app.get('/', function(request, response){
  response.render('index.ejs')
});

app.get('/signup', function(request, response){
  //console.log(session)
  response.render('signup.ejs');
});

// sign up
app.post('/signup', function(request, response){
  console.log(request.body);

  db.collection('users').save(request.body, function(error, result){
    if(error != null){
      throw error;
    }
    request.session.user = result.ops[0];
    response.redirect('/profile');
    // console.log(result.toArray());
  })
});

app.get('/error', function(request, response){
  response.render('error.ejs');
})

// handle routes for login
app.get('/login', function(request, response){
  response.render('login.ejs');
})

// user profile
app.get('/profile', function(request, response) {
  var user = request.session.user;
  console.log(app.get('user'));
  ///render profile page with user info
  response.render('profile.ejs', {user: user});
});

app.get('/admin', function(request, response) {
  var user = request.session.user;
  //console.log(app.get('user'));
  ///render profile page with user info
  if(user && user.admin){
    response.render('admin.ejs', {user: user})
  } else {
    response.render('error.ejs');
  }

});

// logout route
app.get('/logout', function(request, response){
  // destroy the session clearing out it's data
  request.session.destroy();
// redirect back to the login page
  response.redirect('/login');
})
// user profile page
app.post('/login', function(request, response){
  //response.send('Hello')
  // console.log(response.body);
  db.collection('users').findOne(
    {
    username: request.body.username,
    password: request.body.password
  },
  function(error, user){
    //console.log(result);
    //response.redirect('/login');
    // check if we have a user
    if(user == null){
      console.log('error')
      response.redirect('/error');

    } else {
      // app.set('user', result)
      // response.redirect('/profile');
      request.session.user = user;




        if(user.admin){
          response.redirect('/admin');
        } else {
          response.redirect('/profile')
        }
    }
  }
);

});


// build other pages

//app.listen(5000);


























///stuff
