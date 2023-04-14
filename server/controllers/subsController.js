const Subs = require('../models/Subs')
const Organiser = require('../models/Organiser')
const Event = require('../models/Event')
const TokenService = require('../services/token-service.js')

class SubsController{
    async CreateSubOrganiser(req, res){
        const { token } = req.cookies

        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const { organiser_id } = req.params

        const verifyToken = TokenService.validateAccessToken(token)

        const data = await Organiser.getInfoByOrganiser(organiser_id)

        if(!data[0]) return res.status(400).json({status: 'error', error: "Organiser wasn't found!", info: data[0]})

        const sub = await Subs.CheckSubOrganiser(organiser_id, verifyToken.user_id)
        
        if(sub[0]) return res.status(400).json({status: 'error', error: "Sub created!"})

        await Subs.CreateSubOrganiser(organiser_id, verifyToken.user_id)

        return res.status(200).json({ status: "success", success: "Sub of organiser created!"})
    }

    async DeleteSubOrganiser(req, res){
        const { token } = req.cookies

        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const { organiser_id } = req.params

        const verifyToken = TokenService.validateAccessToken(token)

        const data = await Organiser.getInfoByOrganiser(organiser_id)

        if(!data[0]) return res.status(400).json({status: 'error', error: "Organiser wasn't found!", info: data[0]})

        const sub = await Subs.CheckSubOrganiser(organiser_id, verifyToken.user_id)
        
        if(!sub[0]) return res.status(400).json({status: 'error', error: "Sub wasn't found!"})

        await Subs.DeleteSubOrganiser(organiser_id, verifyToken.user_id)

        return res.status(200).json({ status: "success", success: "Sub of organiser deleted!"})
    }

    async CreateSubEvent(req, res){
        const { token } = req.cookies

        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const { event_id } = req.params

        const verifyToken = TokenService.validateAccessToken(token)

        const data = await Event.SelectEvent(event_id)

        if(!data[0]) return res.status(400).json({status: 'error', error: "Event wasn't found!", info: data[0]})

        const sub = await Subs.CheckSubEvent(event_id, verifyToken.user_id)

        if(sub[0]) return res.status(400).json({status: 'error', error: "Sub was create earlier!"})

        await Subs.CreateSubEvent(event_id, verifyToken.user_id)

        return res.status(200).json({ status: "success", success: "Sub of event created!"})
    }

    async DeleteSubEvent(req, res){
        const { token } = req.cookies

        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const { event_id } = req.params

        const verifyToken = TokenService.validateAccessToken(token)

        const data = await Event.SelectEvent(event_id)

        if(!data[0]) return res.status(400).json({status: 'error', error: "Event wasn't found!", info: data[0]})

        const sub = await Subs.CheckSubEvent(event_id, verifyToken.user_id)
        
        if(!sub[0]) return res.status(400).json({status: 'error', error: "Sub wasn't found!"})

        await Subs.DeleteSubEvent(event_id, verifyToken.user_id)

        return res.status(200).json({ status: "success", success: "Sub of event deleted!"})
    }
}

module.exports = new SubsController