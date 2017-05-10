var express = require('express')
var app = express()
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/sri";
var bodyparser = require('body-parser');
var obj = require('./retail');
mongoose.connect('mongodb://localhost:27017/chaitu');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    'extended': false
}));
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + 'main.html');
});
app.get('/create', function (req, res) {
    res.sendFile(__dirname + '/' + 'acreate..html');
});
app.get('/update', function (req, res) {
    res.sendFile(__dirname + '/' + 'update.html');
});
app.get('/retrieve', function (req, res) {
    res.sendFile(__dirname + '/' + 'retrieve.html');
});

app.post('/data', function (req, res) {

    var data = {
        productid :req.body.productid,
        productname : req.body.productname,
        quantity : req.body.quantity,
        price : req.body.price,

    }
obj.addProduct(data, function(err, data) {
        if (data) {
           response ="Data inserted succesfully"
            
            res.send(response);
        } else {
           error = {
                "error": "Sorry insertion failed"
            }
            res.json(error);
            console.log(err);
        }
    });

});
    
app.post('/retrieve', function (req, res) {

var ret=req.body.productid;

obj.getProductByField(ret, function(err, ret) {
        if (ret) {
           response = "Data retrieve succesfully"
            res.send(ret);
        } else {
           error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
            console.log(err);
        }
    });

});

app.post('/purchase', function(req, res) {
    var name = req.body.productid;
    obj.removeProduct(name, function(err, name) {
        if (name) {
            response ="Product Record has been Purchased!"
            
            res.send(response);
        } else {
            error = {
                "error": "Please check entered ID"
            }
            res.json(error);
            console.log(err);
        }
    });
});
app.post('/update', function(req, res) {
    var productid = req.body.productid;
    var data = ({
        productid: req.body.productid,
        productname: req.body.productname,
        quantity: req.body.quantity,
        price: req.body.price,
    });
    //Calls the function from Product.js model
    obj.updateProduct(productid,data, {}, function(err, Product) {
        if (Product) {
          response = "Product Details have been updated!"
            res.send(response);
            console.log(data);
        } else {
          error = "Sorry update failed"
            
            res.json(error);
        }
        
            console.log(err);
    });
});

app.post('/entiredata', function(req, res) {
    obj.getDetails(function(err,dt) {
        console.log(dt);
        if (dt) {
           response = {
                "result": dt
            }
            res.send(dt);
        } else {
           error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
        }
    });
});

app.listen(3000);
