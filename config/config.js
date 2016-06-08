var globalConfig = {
	applicationPort : 3000,
	apiName : "/api",
	mongoDBURI : "mongodb://localhost:27017/RPSGameDB"
};

var rankingConfig = {
	firstPlacePoints : 3,
	secondPlacePoints : 1
}

exports.globalConfig = globalConfig;
exports.rankingConfig = rankingConfig;