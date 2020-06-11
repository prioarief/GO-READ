const expresss = require("express")
const router = expresss.Router()
const authorRoute = require("./author")
const genreRoute = require("./genre")
const authRoute = require("./auth")
const bookRoute = require("./book")


router.use('/authors', authorRoute)
router.use('/genres', genreRoute)
router.use('/books', bookRoute)
router.use('/auth', authRoute)

module.exports = router
