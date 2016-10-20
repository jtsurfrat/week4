const express = require('express');

const session = require('express-session');

const MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser');

const app = express();

const port = 3000;

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

app.set(express.static('public'));

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

app.get('/error', function(request, response){
    response.render('error.ejs')
})


// ---------------------------------

//Products

// route displaying a list of products
app.get('/product', function(request, response){
    // pull all of the products items from the database    result list is from query
    db.collection('products').find().toArray(function(error, resultList) {
        // throw erroer
        if(error){
            throw error;
            response.redirect('/error');
        } else {
            //this is tempory
            var item = resultList[0];
            console.log('item id:', item._id);


            //console.log(resultList);
            //render page once the query is done
            response.render('product-list.ejs', {
                productList: resultList

            });
        }
    });


});

// - Create the items in the database.
// - Do a query for the items using:
//     - db.collection ('products').find ();
// - Push all the founds items to the products page.
// - Render each of the items to page.


app.get('/cart/add/:id', function(request, response){

    var objectId = request.params.id;

    db.collection('products').findOne(
        {
            //id: productId
            name: objectId

        },

        {},
        function(error, resultList){
            if(error){
                throw error;
                response.redirect('/error');
            }

            // check for shopping cart in the session
            var cart = request.session.cart

            //if no cart exist, creat a new shoping cart

            if(!cart){
                cart = {
                    itemList:[]
                };
                // save the cart to the session
                request.session.cart = cart;
            }

            var item = resultList;

            // Grab teh item from the result lsit
            // cart.itemList.push(item);

            cart.itemList.push(item);

            console.log('____________')

            console.log('result list:', resultList);
            console.log('cart: ', cart);
            console.log('');

            // add product to cart
            //cart.itemList.push(item);
            // console.log('result list:', resultList);
            response.redirect('/cart');
    })
    // console.log('Item added by id:' + request.params.id)
    // response.redirect('/product')
    //{"_id": new ObjectId(id)}
})





























/// stuff
