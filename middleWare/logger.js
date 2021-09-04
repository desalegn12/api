const logger = (req, res, next) => {
	console.log(
		`${req.method}: ${req.protocol}://${req.get("host")} ${
			req.originalUrl
		} \n don't forget I am a logger!`
	);

	next(); // mallow the application move to the next middle wire right after this
};

//optionally we can use the module.exports
module.exports = logger;
