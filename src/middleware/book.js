const joi = require("joi")

const schema = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    genre_id: joi.number().required(),
    author_id: joi.number().required(),
    status: joi.string().required(),
})

module.exports = schema