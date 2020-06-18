const expresss = require("express")
const router = expresss.Router()
const tokenvalidation = require("../middleware/checkToken")
const checkRole = require("../middleware/checkRole")
const authorRoute = require("./author")
const genreRoute = require("./genre")
const authRoute = require("./auth")
const bookRoute = require("./book")
const transactionRoute = require("./transaction")
const roleRoute = require("./role")
const profileRoute = require("./profile")


router.use('/api/authors', tokenvalidation, authorRoute)
router.use('/api/genres', tokenvalidation, genreRoute)
router.use('/api/books', tokenvalidation, bookRoute)
router.use('/api/roles', tokenvalidation, checkRole.checkRole, roleRoute)
router.use('/api/transaction', tokenvalidation, checkRole.checkRole, transactionRoute)
router.use('/api/auth', authRoute)
router.use('/api/profile', tokenvalidation, profileRoute)

module.exports = router
