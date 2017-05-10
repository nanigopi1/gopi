var mongoose = require('mongoose');
//Defining Schema
var retailSchema = mongoose.Schema({


    productid: {
        type: String,
        required: true
    },

    productname: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true
    },

});

var retailpackage = module.exports = mongoose.model('ProductCollection', retailSchema); //Binding schema 

module.exports.addProduct = function(data, callback) {
    retailpackage.create(data, callback);
}
module.exports.getProductByField = function(ret, callback) {
    retailpackage.find({productid:ret}, callback);
}
module.exports.updateProduct = function(productid, data, options, callback) {
    var query = {
        productid: productid
    };
    var update = {
        productid: data.productid,
        productname: data.productname,
        price: data.price,
        quantity: data.quantity,
    }
    retailpackage.findOneAndUpdate(query, update, options, callback);
}
module.exports.purchase = function (productid, callback) {
    var query = {
        productid: productid
    };
    retailpackage.remove(query, callback);
}
module.exports.getDetails = function(callback) {
    retailpackage.find(callback);
}

