// Lines 2-4 are configuring and requiring the .env file, initializing the jwt variable as the json web token implementation
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = {
	// module.exports has one function called isAuthenticated which takes in req, res, and next as its parameters.

	isAuthenticated: (req, res, next) => {
		//Line 9 creates the headerToken variable

		const headerToken = req.get("Authorization");

		//  Lines 16 - 19 will send a console log and status code of 401 if the headerToken is not present.

		if (!headerToken) {
			console.log("Middleware Error");
			res.sendStatus(401);
		};

		//Line 18 is declaring the token variable.

		let token;

		//The try/catch block below initializes the token variable and throws an error if the token is not present
		try {
			token = jwt.verify(headerToken, SECRET);
		} catch (err) {
			//This will send a status code for a server error
			err.statusCode = 500;
			throw err;
		};

		if (!token) {
			const error = new Error("You are not authenticated to view this.");
			//This will send a status code for a client error
			error.statusCode = 401;
			throw error;
		};

		next();
	},
};
