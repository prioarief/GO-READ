const joi = require("joi")

const schema = joi.object().keys({
    role: joi.string().required(),
})

module.exports = schema