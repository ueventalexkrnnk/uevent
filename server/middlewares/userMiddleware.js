const {validationResult} = require('express-validator')

class userMiddleware{
    async getUserByIdMiddleware(req, res, next){
        const validationError = validationResult(req)
    
        if(!validationError.isEmpty()) return res.json({status: "error", error: "User wasn't founded!", data: validationError.array()})
        next()
    }
}

module.exports = new userMiddleware