const joi = require("joi")

const schema = joi.object().keys({
    genre: joi.string().required()
})

module.exports = schema