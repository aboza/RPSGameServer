var DARanking = require("./DataAccess/DARanking");

/**CompareChoices
input: value1,value2 (R,P or S)
choice1,choice2 as the choice that the player did
output: True or False if the values matchs
*/
var compareChoices = function (value1, value2, choice1, choice2) {
    return (value1 === choice1 && value2 === choice2);
}

/**ValidateGame
input: aGame who is going to be validated
output : none
exception: If the game is not valid throws an execption
*/
var ValidateGame = function (aGame){
	GameMoves = ["R","P","S"];
	if (aGame.length != 2) 
    	throw "Incorrect number of players"; 
	else if (GameMoves.indexOf((aGame[0][1]).toUpperCase()) == -1)
		throw "Player 1 non valid move";
	else if (GameMoves.indexOf((aGame[1][1]).toUpperCase()) == -1)
		throw "Player 2 non valid move"; 
}

/**GetGameWinner
input: aGame
output : a winner player in the form of a bracket list [["Dave","S"]]
*/
var GetGameWinner = function (aGame){
	ValidateGame(aGame);
	vFirstPlayer = aGame[0];
	vSecondPlayer = aGame[1];
	vFirstPlayerMove = (vFirstPlayer[1]).toUpperCase();
	vSecondPlayerMove = (vSecondPlayer[1]).toUpperCase();


	if (vFirstPlayerMove == vSecondPlayerMove)
		return vFirstPlayer;
	else if ((compareChoices("P", "R", vFirstPlayerMove, vSecondPlayerMove)) ||
		(compareChoices("R", "S", vFirstPlayerMove, vSecondPlayerMove))||
		(compareChoices("S", "P", vFirstPlayerMove, vSecondPlayerMove)))
		return vFirstPlayer;
	else
		return vSecondPlayer;
};

/**GetChampionshipWinner
input: aTournament
output : a winner player in the form of a bracket list [["Dave","S"]]
*/
var GetTournamentWinner = function (aTournament){
	if (Array.isArray(aTournament[0][0]))
	{
		aTournament = [GetTournamentWinner(aTournament[0]) , GetTournamentWinner(aTournament[1])]
	}
	return GetGameWinner(aTournament);
}


/**UpdatePlayersScore
input: afirstPlayer,aSecondPlayer
output : none
action: Stores the first and the second place of a tournament
*/
var UpdatePlayersScore = function (aFirstPlayer,aSecondPlayer,callback){
	 DARanking.UpdatePlayersScore(aFirstPlayer,aSecondPlayer,function(value){
	  callback (value);
	});
};


/**GetTopPlayers
input: aTopPlayers as a numeric value of top players to be returned, example: the first 10 players
output : A bracket list with the top players
*/
var GetTopPlayers = function(aTopPlayers,callback){
	DARanking.GetTopPlayers(aTopPlayers,function(value){
		var vPlayers = value.map(function(record){
			return record.player;
		})
		callback({players:vPlayers});
	});
};

exports.GetGameWinner = GetGameWinner;
exports.GetTournamentWinner = GetTournamentWinner;
exports.UpdatePlayersScore = UpdatePlayersScore;
exports.GetTopPlayers = GetTopPlayers;