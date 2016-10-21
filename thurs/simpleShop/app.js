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
        //call back function
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
                    total:0,
                    itemList:[]
                };
                // save the cart to the session
                request.session.cart = cart;
            }


            var item = resultList;

            // add to the cart qauntiy
            cart.total = cart.total + item.price;

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

app.get('/cart', function(request, response){
    //grab teh shopping cart
    var cart = request.session.cart;
    //create the shoppoing cart if it doenst' exits
    if(!cart){
        cart = {
            total: 0,
            itemList: []
        }
        //save the cart to session
        request.session.cart = cart;
    }

    // render the cart pays
    response.render('cart.ejs', {cart: cart});
});

//use a path to clear out the cart items
// - get /cart/clear   clear out the cart items

app.get('/clear-cart', function(request, response){
    request.session.destroy();
    response.redirect('/product');
});

// remove individual items from it
app.get('/cart/remove/:index', function(request, response){
    console.log('remove item by index', request.params.index);
    var cart = request.session.cart;
    var index = request.params.index;
    var price = cart.itemList[index].price;

    //[request.params.price];



    //var removeItem = cart.splice(index, 1);

    console.log("mycart:", cart.itemList);

    var removeItem = cart.itemList.splice(index, 1);

    console.log("removeItem ", removeItem);
    cart.total  -= price;
    //console.log('total', cartTotal);
    //cart.total = cartTotal;
    //cart.total = cart.total - item.price;

    response.redirect('/cart');
})

// change the cart so that I can remove individual items from it
// checkout and pay for the items in my cart




// - summary
// get/cart/ summary
// get/ cart/ pays
// get /cart/ summary































/// stuff
