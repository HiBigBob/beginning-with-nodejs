var express = require('express');
var routes = require('./routes/index.js');
var user = require('./routes/users.js');
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
app.use(favicon('../request/public/favicon.ico'));
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

app.use('/', routes);
app.use('/users', user);

var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socket.on('messageChange', function (data) {
    console.log(data);
    socket.emit('receive', data.message.split('').reverse().join('') );
  });
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port '
  + app.get('port'));
});
