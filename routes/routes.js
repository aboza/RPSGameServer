var GameSolver = require('../GameSolver.js');


//Requests Handlers

//championship/new
module.exports.newChampionship = function (request , response){
	var vTournament = request.body.data;
	sendResponse(response,200,GameSolver.GetTournamentWinner(vTournament));
};

//championship/result
module.exports.UpdatePlayerResults = function (request,response){
	var vFirstPlace = request.body.first,
		vSecondPlace = request.body.second;
	var vStatus = 200;

	GameSolver.UpdatePlayersScore(vFirstPlace,vSecondPlace,function(value){
	if (value.status === "error")
		vStatus = 500;

	sendResponse(response,vStatus,value);	
	});
};

//championship/top
module.exports.GetTopPlayers = function(request,response){
	var vTopPlayers = parseInt(request.query.count);
	var vStatus = 200;
	GameSolver.GetTopPlayers(vTopPlayers,function(value){
	if (value.status && value.status === "error")
		vStatus = 500;

	sendResponse(response,vStatus,value);
	})

}

//Response Handler
function sendResponse(responseObject,status,message){
	responseObject.status(status).send(message);
}