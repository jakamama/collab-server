var express = require('express')
var app = express();
var server = require('http').Server(app);
var path = require('path');
var url = require('url');
var http = require('http');
var request = require('request');
var nano = require('nano');

server.listen(8080);

app.get('/add_group', function (req, res) {
  //should probably check user session key to make sure logged in
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  console.log("asked for a GET", query)
  var nano = require('nano')('http://admin:jakamama@jakamama.iriscouch.com/');
  //creating new db for group
  nano.db.create(query.name);
  
  // request.put("http://admin:jakamama@jakamama.iriscouch.com/" + query.name, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     console.log(body) // Show the HTML for the Google homepage. 
  //   }
  // })
  //TODO need to set the user as the admin user on the group so noone else can access

  //adding the group to the users list - actually this could be done in front end
  // var userDB = nano.use(query.user)
  // userDB.list({include_docs: true},function(err,body){
  //   console.log("first doc", body.rows[0].doc)
  //   var groupsDoc = body.rows[0].doc
  //   groupsDoc.groups.push( { id:3,  name:query.name} )
  //   userDB.insert( groupsDoc, groupsDoc.id)  
  // });


});

app.get('/add_user', function (req, res) {
  //should probably check user session key to make sure logged in
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  console.log("asked for a GET", query)
  var nano = require('nano')('http://admin:jakamama@jakamama.iriscouch.com/');
  //creating new db for group
  res.set('Access-Control-Allow-Origin', '*');
  nano.db.create(query.name, function(err, body) {
    if (!err) {
      console.log('database ' + query.name + ' created!');
      res.status(200).send('Yay!');
    }
    else{
      res.status(200).send('Fuckayou!');
    }
  });


});

app.get('/test', function (req, res) {
  res.status(200).send('Yay!');
});

//http://localhost:8080/?name=lala&user=jay