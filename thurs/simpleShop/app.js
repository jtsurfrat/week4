const express = require('express');

const session = require('express-session');

const MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser');

const app = express();

app.use(session({
  secret: 'This is my secret code',
  resave: false,
  saveUninitialized: true
}));

var db;

MongoClient.connect('mongodb://jtsurfrat:porter566@ds041841.mlab.com:41841/shoppingcart2',
function(error, database){
  if(error != null){
    throw error;
  }
  db = database;

  console.log('Successful connection to the database');
  app.listen(3000, function() {
    console.log('App started on port 3000');
  })
});

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(request, response){
  response.render('index.ejs')
})

app.get('/signup', function(request, response){
  response.render('signup.ejs');
})

app.get('/login', function(request, response){
  response.render('login.ejs');
})





























/// stuff
