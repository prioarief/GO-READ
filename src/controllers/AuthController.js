const helper = require("../helpers/message");
const validate = require("../helpers/validate");
const emailVerification = require("../helpers/email");
const auth = require("../models/Auth");
const { genSaltSync, compareSync, hashSync } = require("bcrypt");
const token = require("../middleware/createToken");

module.exports = {
	register: async (req, res) => {
		const setData = req.body;
		try {
			const validation = validate.registerValidation(setData);
			if (validation.error == null) {
				const emailCheck = await auth.login(setData.email);
				emailVerification.emailVerify(setData);
				if (emailCheck.length == 0) {
					setData.password = hashSync(req.body.password, genSaltSync(1));
					const result = await auth.register(setData);
					const data = await auth.detailUser(result.id)
					delete data[0].password;
					return helper.response(res, "success", data, 201);
				}
				return helper.response(res, "failed", "Email has been registered", 300);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, "");
			return helper.response(res, "failed", errorMessage, 401);
		} catch (error) {
			console.log(error);
			return helper.response(res, "failed", "Internal Server Error", 500);
		}
	},

	auth: async (req, res) => {
		const setData = req.body;
		const email = setData.email;
		const password = setData.password;
		try {
			const validation = validate.authValidation(setData);
			if (validation.error == null) {
				const result = await auth.login(email);
				if (result.length > 0) {
					const hash = result[0].password;
					const verify = compareSync(password, hash);
					if (verify) {
						delete result[0].password;
						let newToken = token.createToken(result, process.env.JWT_KEY, "1m");
						let refreshToken = token.createToken(result, process.env.JWT_KEY, "2m")

						result[0].token = newToken;
						result[0].refreshToken = refreshToken
						return helper.response(res, "success", result, 201);
					}
					return helper.response(res, "failed", "Password wrong!", 300);
				}
				return helper.response(res, "failed", "Email is not registered", 404);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, "");
			return helper.response(res, "failed", errorMessage, 401);
		} catch (error) {
			console.log(error);
			return helper.response(res, "failed", "Internal Server Error", 500);
		}
	},

	refreshToken: async (req, res) => {
		const OldToken = req.decoded.result[0]
		try {
            const newToken = token.createToken(OldToken, process.env.JWT_KEY, "1m");
			// const RefreshToken = token.createToken(OldToken, process.env.JWT_KEY, "1m");
			
			const result = {
				token : newToken,
			}

			return helper.response(res, "success", result, 200);
		} catch (error) {
			console.log(error);
			return helper.response(res, "failed", "Internal Server Error", 500);
		}
	},
};
