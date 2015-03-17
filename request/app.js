var express = require('express');
var routes = require('./routes/index.js');
var user = require('./routes/users.js');
var compression = require('compression');
var favicon = require('serve-favicon');
var http = require('http');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())    // parse application/json
app.use(methodOverride()); 
// app.use(app.router);
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler())
}


app.get('/search', function(req, res) {
  console.log(req.query);
  res.end(JSON.stringify(req.query)+'\n');
});

app.get('/params/:role/:name/:status', function(req, res) {
  console.log(req.params);
  console.log(req.route);
  res.end();
});

app.post('/body', function(req, res){
  console.log(req.body);
  res.end(JSON.stringify(req.body)+'\n');
});

app.post('/upload', function(req, res){
  console.log(req.files.archive);
  //read req.files.archive.path
  //process the data
  //save the data
  res.end();
});

app.get('/route', function(req, res){
  console.log(req.route);
  res.end();
});
app.use('/', routes);
app.use('/users', user);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});