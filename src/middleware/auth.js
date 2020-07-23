const joi = require("joi");

const schema = {
	register: joi.object().keys({
		email: joi.string().email({ minDomainAtoms: 2 }).required(),
		password: joi.string().min(6).required(),
		name: joi.string().required(),
		role: joi.number().required(),
	}),

	login: joi.object().keys({
		email: joi.string().email({ minDomainAtoms: 2 }).required(),
		password: joi.string().required(),
	}),
	
	verification: joi.object().keys({
		email: joi.string().email({ minDomainAtoms: 2 }).required(),
		code: joi.string().min(6).max(6).required(),
	}),
	
	edit: joi.object().keys({
		email: joi.string().email({ minDomainAtoms: 2 }),
		name: joi.string(),
		role: joi.string(),
		password: joi.string().min(6),
	}),
};

module.exports = schema;
