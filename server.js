var express             = require('express'),
    app                 = express(),
    router              = express.Router(),
    bodyParser          = require('body-parser'),
    mongoose            = require('mongoose'),
    path                = require('path'),
    server              = require('http').createServer(app),
    fs                  = require('fs');
    data                = fs.readFileSync('defaults/staff.json', 'utf8');

//list of moderators
var staff = JSON.parse(data);

// Use environment defined port or 8080
var port = process.env.PORT || 8080;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};

app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/scripts', express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(__dirname + "/client"));

app.get('/staff', function(req, res){
  res.send(staff);
});

//start up the server
server.listen(port, function(){
    console.log('listening on port:', port);
});
