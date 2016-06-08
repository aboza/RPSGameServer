//imports
var express = require("express"),  
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
	config = require('./config/config'),
	routes = require('./routes/routes');

var app = express();

//set server configurations and headers(CORS)
app.set('port',config.applicationPort);
app.use(function (req,res,next){
	res.header("Acces-Control-Allow-Origin","*");
	res.header('Access-Control-Allow-Headers', '*');
	next();
});

//body parser its use to parse Json requests
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  

var router = express.Router();

//resources routes
router.post(config.globalConfig.apiName + '/championship/new', routes.newChampionship);
router.post(config.globalConfig.apiName + '/championship/result', routes.UpdatePlayerResults);
router.get(config.globalConfig.apiName + '/championship/top', routes.GetTopPlayers);

app.use(router);

app.listen(config.globalConfig.applicationPort, function() {
    console.log("Node server running on http://localhost:" + config.globalConfig.applicationPort);
  });

