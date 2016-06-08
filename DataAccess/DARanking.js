var config = require('../config/config'),
    MongoClient = require('mongodb').MongoClient,
    asser = require('assert');


/**UpdatePlayersScore
input: afirstPlayer,aSecondPlayer
output : none
action: Stores the first and the second place of a tournament
*/   
var UpdatePlayersScore = function (first,second,callback){
ConnectMongoDB(function(db){
		var rankingCollection = db.collection("ranking");

	rankingCollection.findAndModify(
		{player : first},
		{score : 1},
		{$inc : {score: config.rankingConfig.firstPlacePoints}},
		{upsert: true},function(err,object){
		if (err){
			console.log(JSON.stringify(err));
			db.close();
			callback ({ status : "error"});
		}else{
			rankingCollection.findAndModify(
			{player : second},
			{score : 1},
			{$inc : {score: config.rankingConfig.secondPlacePoints}},
			{upsert: true},function(err,object){
				if (err){
					db.close();
					callback ({ status : "error"});
				}else{
					db.close();
					callback ({ status : "sucess"});
				}
			});
		}
	});
},callback);
};

/**GetTopPlayers
input: aTopPlayers as a numeric value of top players to be returned, example: the first 10 players
output : A bracket list with the top players
*/
var GetTopPlayers = function(aTopPlayers,callback){
	ConnectMongoDB(function(db){
	var rankingCollection = db.collection("ranking");

	rankingCollection.find({},{limit:aTopPlayers,fields:{"_id": 0,"player": 1}}).toArray(function(err, docs) {
        if (err){
        	db.close();
        	console.log(JSON.stringify(err));
        	callback({ status : "error"})
        }
        else{
        	db.close();
        	callback(docs);
        }
      });
	},callback);
};

/**GetTopPlayers
input: none
output : none
action: establish a connection with the MongoDB
*/
var ConnectMongoDB = function(process,callback){
	MongoClient.connect(config.globalConfig.mongoDBURI,function(err,db){
		if (err) {
		db.close();
		callback ({ status : "error"});
		}
		else
		{
			process(db);
		}
	});
};

exports.GetTopPlayers = GetTopPlayers;
exports.UpdatePlayersScore = UpdatePlayersScore; 