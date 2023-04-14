const { updateStatus } = require('../models/Organiser')
const Organiser = require('../models/Organiser')
const TokenService = require('../services/token-service.js')

class OrganiserController{
    async getAllOrganisers(req, res){
        const { token } = req.cookies
    
        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })
    
        const organisers = await Organiser.getAllOrganiser()
    
        return res.status(200).json({ status: "success", success: "List of organisers formed", organisers: organisers })
    }

    async getInfoByOrganisers(req, res){
        const { token } = req.cookies

        const { organiser_id } = req.params
    
        if(!token) return res.status(400).json({ status: "error", success: "Register or log in!" })
    
        const organiser = await Organiser.getInfoByOrganiser(organiser_id)

        if(!organiser[0]) return res.status(400).json({ status: "error", error: "Info about organiser took!", info: organiser })
    
        return res.status(200).json({ status: "success", success: "Info about organiser took!", info: organiser })
    }


    async gettingOrganiserStatus(req, res){
        const { token } = req.cookies
    
        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const verifyToken = TokenService.validateAccessToken(token)

        const { title, description, profileStatus = 'organiser' } = req.body

        if(verifyToken.status == profileStatus)
            return res.status(400).json({status: "error", error: "Organiser created!"})

        await Organiser.insertDateOrganiser(verifyToken.user_id, title, description)

        await Organiser.updateStatus(verifyToken.user_id, profileStatus)

        const NewToken = TokenService.generateLoginTokens({
            user_id: verifyToken.user_id, 
            email: verifyToken.email, 
            login: verifyToken.login,
            firstName: verifyToken.firstName,
            lastName: verifyToken.lastName,
            middleName: verifyToken.middleName,
            status: profileStatus
         })

        res.clearCookie('token', { secure: true, httpOnly: true })

        res.cookie('token', NewToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        await Organiser.updateToken(NewToken)

        return res.status(200).json({ status: "success", success: "Organizer status received"})
    }

    async deleteOrganiserStatus(req, res){
        const { token } = req.cookies
    
        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const verifyToken = TokenService.validateAccessToken(token)

        const { profileStatus = 'user' } = req.body

        if(verifyToken.status == profileStatus)
            return res.status(400).json({status: "error", error: "Organiser deleted!"})

        await Organiser.deleteOrganiserStatus(verifyToken.user_id)

        await updateStatus(verifyToken.user_id, profileStatus)

        const NewToken = TokenService.generateLoginTokens({
            user_id: verifyToken.user_id, 
            email: verifyToken.email, 
            login: verifyToken.login,
            firstName: verifyToken.firstName,
            lastName: verifyToken.lastName,
            middleName: verifyToken.middleName,
            status: profileStatus
         })

        res.clearCookie('token', { secure: true, httpOnly: true })

        res.cookie('token', NewToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        return res.status(200).json({ status: "success", success: "Organizer status deleted"})
    }

    async updateOrganiserStatus(req, res){
        const { token } = req.cookies
    
        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const { title, description } = req.body

        const verifyToken = TokenService.validateAccessToken(token)

        await Organiser.updateOrganiserData(verifyToken.user_id, title, description)

        return res.status(200).json({ status: "success", success: "Organiser's date was updated!"})
    }
}

module.exports = new OrganiserController