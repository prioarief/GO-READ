const joi = require("joi")
const author = require("./validation/author")
const genre = require("./validation/genre")
const book = require("./validation/book")
const auth = require("./validation/auth")

module.exports = {
    authorValidation : (data) => {
        return joi.validate(data, author)
    },
    
    genreValidation : (data) => {
        return joi.validate(data, genre)
    },
    
    bookValidation : (data) => {
        return joi.validate(data, book)
    },

    registerValidation : (data) => {
        return joi.validate(data, auth.register)
    },
    
    authValidation : (data) => {
        return joi.validate(data, auth.login)
    }
}