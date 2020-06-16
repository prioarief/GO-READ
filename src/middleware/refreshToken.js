module.exports = {
	MiddlewareRefreshToken: async(req, res, next) => {
        try {
            const decoded = req.decoded
            next()
        } catch (error) {
            console.log(error)
        }
    }
};
