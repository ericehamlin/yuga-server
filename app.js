
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var timeline = require('./routes/timeline');
var http = require('http');
var path = require('path');
var monk = require('monk');
var db = monk('localhost:27017/yuga');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('M19htymach'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// ROUTES
app.all('/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    next();
});

app.get('/', routes.index);
app.get('/user', user.list);

app.get('/timeline', timeline.query(db));
app.get('/timeline/:id', timeline.read(db));
app.post('/timeline', timeline.create(db));
app.put('/timeline/:id', timeline.update(db));


// CREATE SERVER
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
