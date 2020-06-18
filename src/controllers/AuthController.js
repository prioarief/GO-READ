const randomCode = require("randomatic")
const helper = require("../helpers/message");
const validate = require("../helpers/validate");
const emailVerification = require("../helpers/email");
const auth = require("../models/Auth");
const { genSaltSync, compareSync, hashSync } = require("bcrypt");
const token = require("../helpers/createToken");
const { valid } = require("../middleware/book");


module.exports = {
	register: async (req, res) => {
		const setData = req.body;
		try {
			const validation = validate.registerValidation(setData);
			if (validation.error == null) {
				const emailCheck = await auth.login(setData.email);
				if (emailCheck.length == 0) {
					setData.password = hashSync(req.body.password, genSaltSync(1));
					const result = await auth.register(setData);
					setData.code = randomCode('a0', 6)
					setData.is_active = 0
					emailVerification.emailVerify(setData);
					const code = {
						code : setData.code,
						email : setData.email,
					}
					await auth.insertCode(code)
					const data = await auth.detailUser(result.id)
					delete data[0].role;
					delete data[0].is_active;
					delete data[0].password;

					const message = {
						message : "Registration successful, check your email to verify email",
						data : data
					}
					return helper.response(res, "success", message, 201);
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

	verification : async (req, res) => {
		const setData = {
			code : req.body.code,
			email : req.body.email,
		}
		try {
			const validation = validate.activationValidation(setData)
			if(validation.error == null){
				const check = await auth.getCode(setData.email)
				const checkEmail = await auth.login(setData.email)
				if(checkEmail.length != 0){
					if(check.length != 0){
						if(setData.code === check[0].code && setData.email === check[0].email){
							const data = {
								is_active : 1
							}
							await auth.editUsers(data, checkEmail[0].id )
							await auth.deleteCode(setData.email)
							return helper.response(res, "success", 'Activation Success', 200);
						}
	
						return helper.response(res, "failed", "Activation failed, The code is wrong!", 401);
					}
					return helper.response(res, "failed", "Email is wrong!", 401);
				}

				return helper.response(res, "failed", "Email is not registered!", 401);
				
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, "");
			return helper.response(res, "failed", errorMessage, 401);
		} catch (error) {
			console.log(error)
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
				if (result.length > 0 ) {
					if(result[0].is_active === 1){
						const hash = result[0].password;
						const verify = compareSync(password, hash);
						if (verify) {
							delete result[0].password;
							let newToken = token.createToken(result, process.env.JWT_KEY, "1h");
							let refreshToken = token.createToken(result, process.env.JWT_KEY, "24h")

							result[0].token = newToken;
							result[0].refreshToken = refreshToken
							return helper.response(res, "success", result, 201);
						}
						return helper.response(res, "failed", "Password wrong!", 300);
					}
					return helper.response(res, "failed", "Your account is not active!", 300);
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

	detailUser : async (req, res) => {
		const email = req.params.email
		try {
			const result = await auth.login(email)
			if(result.length == 1){
				delete result[0].password 
				return helper.response(res, "success", result, 200);
			}
			return helper.response(res, "success", `Email ${email} not found`, 404);
		} catch (error) {
			console.log(error);
			return helper.response(res, "failed", "Internal Server Error", 500);
		}
	},
	
	editUser : async (req, res) => {
		const email = req.params.email || null
		const setData = req.body
		try {
			let dataLength = 0
			for(const key in setData){
				dataLength++
			}
			
			const validation = validate.editUserValidation(setData)
			if(validation.error == null){
				if(dataLength > 0){
					const result = await auth.login(email) 
					if(result.length == 1){
						const id = result[0].id
						if(req.body.password){
							setData.password = hashSync(req.body.password, genSaltSync(1));
						}
						const data = await auth.editUsers(setData, id)
		
						if(data.affectedRows == 1){
							delete setData.password
							const response = {
								id : id,
								...setData
							}
							return helper.response(res, "success", response, 200);
						}
					}
					return helper.response(res, "success", `Email ${email} not found`, 404);
				}
				return helper.response(res, "failed", 'Nothing changed', 401);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, "");
			return helper.response(res, "failed", errorMessage, 401);
		} catch (error) {
			console.log(error);
			return helper.response(res, "failed", "Internal Server Error", 500);
		}
	},
	
	deleteUser : async (req, res) => {
		const email = req.params.email
		try {
			const result = await auth.login(email) 
			if(result.length == 1 ){
				const id = result[0].id
				const data = await auth.deleteUser(id)

				if(data.affectedRows == 1){
					return helper.response(res, "success", `Email ${email} succesfull deleted`, 200);
				}
			}
			return helper.response(res, "success", `Email ${email} not found`, 404);

		} catch (error) {
			console.log(error);
			return helper.response(res, "failed", "Internal Server Error", 500);
		}
	},
};
