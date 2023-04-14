const {validationResult} = require('express-validator')

class authMiddleware{
    async registerMiddleware(req, res, next){
        const validationError = validationResult(req)
    
        if(!validationError.isEmpty()) return res.json({status: "error", error: "Uncorrect request!", data: validationError.array()})
        next()
    }

    async SendPasswordMailMiddleware(req, res, next){
        const validationError = validationResult(req)
    
        if(!validationError.isEmpty()) return res.json({status: "error", error: "Uncorrect request!", data: validationError.array()})
        next()
    }

    async TokenPasswordMiddleware(req, res, next){
        const validationError = validationResult(req)
    
        if(!validationError.isEmpty()) return res.json({status: "error", error: "Validation error!", data: validationError.array()})
        next()
    }
}

module.exports = new authMiddleware