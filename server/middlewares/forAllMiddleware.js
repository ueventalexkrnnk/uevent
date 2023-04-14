const {validationResult} = require('express-validator')

class userMiddleware{
    async allMiddleware(req, res, next){
        const validationError = validationResult(req)
    
        if(!validationError.isEmpty()) return res.json({status: "error", error: "Bad request!", data: validationError.array()})
        next()
    }
}

module.exports = new userMiddleware