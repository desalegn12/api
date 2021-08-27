const NodeGeocoder = require("node-geocoder");
const dotenv = require("dotenv");

dotenv.config({ path: "../config/config.env" });

const options = {
	provider: "mapquest",
	apiKey: "D4dAnVDLtyNVQ0ncuCPLtsiY7QeLEpDI",
	formatter: null,
};

const NodeGeocoderProvider = NodeGeocoder(options);

module.exports = NodeGeocoderProvider;
