module.exports.newChampionship = function (req , res){
	var vChampionship = req.body;
	sendResponse(res,200,"ESTA FELIZ");

};

function sendResponse(responseObject,status,message){
	responseObject.status(status).send(message);
}