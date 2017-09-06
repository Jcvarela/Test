
/**
 * Created by jcvar on 9/5/2017.
 */


var express = require('express');
var app = express();
var mongo = require('mongodb');
// var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

app.get('/',function(req,res,next){
    res.send('hello world!!!');
});


app.get('/get-data',function(req,res, next){
    var resultArray = [];

    mongo.connect(url, function(err,db){
        if(err !== null){
            res.send("error connection to db" + err)
            return;
        }
        var cursor = db.collection('testing-data');
        if(cursor === null){
           res.send("no DB");
           return;
        }
        cursor = cursor.find();

        cursor.forEach(function(doc,err){
           // assert.equal(null,err);
            resultArray.push(doc);
        },function(){
            db.close();
            app.send(resultArray);
        });
    })
});

app.get('/insert',function(req,res, next){
    var item = {
        title: req.title
    };
    mongo.connect(url, function(err,db){
        // assert.equal(null,err);
        db.collection('testing-data').insertOne(item,function(err, result){
            // assert.equal(null, err);
            console.log('item inserted');
            db.close();
        });
    });
});


app.listen("8080");