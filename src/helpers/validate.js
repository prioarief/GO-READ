const joi = require("joi")
const author = require("../middleware/author")
const genre = require("../middleware/genre")
const book = require("../middleware/book")
const auth = require("../middleware/auth")
const role = require("../middleware/role")

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
    },
    
    editUserValidation : (data) => {
        return joi.validate(data, auth.edit)
    },

    roleValidation : (data) => {
        return joi.validate(data, role)
    }
}