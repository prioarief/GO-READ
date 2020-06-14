const jwt = require("jsonwebtoken")
const token = require("../middleware/createToken") 
module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.decoded = decoded
        next()
    } catch (error) {
        if(error.name == 'TokenExpiredError'){
            return res.status(401).json({
                message : 'Token expired!'
            })
        }
        return res.status(401).json({
            message : 'Invalid Token'
        })
    }
}