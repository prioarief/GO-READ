const expresss = require("express")
const router = expresss.Router()
const tokenvalidation = require("../middleware/checkToken")
const refreshToken = require("../middleware/refreshToken")
const authorRoute = require("./author")
const genreRoute = require("./genre")
const authRoute = require("./auth")
const bookRoute = require("./book")


router.use('/api/authors', tokenvalidation,  authorRoute)
router.use('/api/genres', tokenvalidation,  genreRoute)
router.use('/api/books', tokenvalidation,  bookRoute)
router.use('/api/auth', authRoute)

module.exports = router
