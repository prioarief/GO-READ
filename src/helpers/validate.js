const joi = require("joi")
const author = require("./validation/author")
const genre = require("./validation/genre")
const book = require("./validation/book")

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
}