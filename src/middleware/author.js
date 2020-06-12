const joi = require("joi")

const schema = joi.object().keys({
    author: joi.string().required()
})

module.exports = schema