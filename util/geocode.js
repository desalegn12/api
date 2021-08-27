const NodeGeocoder = require("node-geocoder");
const dotenv = require("dotenv");

dotenv.config({ path: "../config/config.env" });

const options = {
	provider: process.env.GEOCODE_PROVIDER,
	apiKey: process.env.GEOCODE_API_KEY,
	formatter: null,
};

const NodeGeocoderProvider = NodeGeocoder(options);

module.exports = NodeGeocoderProvider;
