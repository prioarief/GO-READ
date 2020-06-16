const expresss = require("express")
const router = expresss.Router()
const tokenvalidation = require("../middleware/checkToken")
const checkRole = require("../middleware/checkRole")
const authorRoute = require("./author")
const genreRoute = require("./genre")
const authRoute = require("./auth")
const bookRoute = require("./book")
const roleRoute = require("./role")
const profileRoute = require("./profile")


router.use('/api/authors', tokenvalidation, checkRole.checkRole,  authorRoute)
router.use('/api/genres', tokenvalidation, checkRole.checkRole,  genreRoute)
router.use('/api/books', tokenvalidation, checkRole.checkRole,  bookRoute)
router.use('/api/roles', tokenvalidation, checkRole.checkRole,  roleRoute)
router.use('/api/auth', authRoute)
router.use('/api/profile', tokenvalidation, checkRole.checkRole, profileRoute)

module.exports = router
