const Event = require('../models/Event')
const Organiser = require('../models/Organiser')
const TokenService = require('../services/token-service.js')

class EventController{
    async AllEvents(req, res){
        const { token } = req.cookies
    
        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })
    
        const events = await Event.allEvents()
    
        return res.status(200).json({ status: "success", success: "List of events formed", events: events })
    }

    async CreateEvent(req, res){
        const { token } = req.cookies
    
        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const verifyToken = TokenService.validateAccessToken(token)

        const {title, description, type, startDate, endDate} = req.body

        if(verifyToken.status != 'organiser')
            return res.status(400).json({status: "error", error: "The only organiser can create a event!"})

        const organiser = await Organiser.getOrganiserByUser(verifyToken.user_id)

        await Event.createEvent(organiser[0].organiser_id, title, description, type, startDate, endDate)

        return res.status(200).json({ status: "success", success: "Event created!"})
    }

    async UpdateEvent(req, res){
        const { token } = req.cookies

        if(!token) return res.status(400).json({ status: "error", success: "Register or log in!" })

        const verifyToken = TokenService.validateAccessToken(token)

        const { event_id } = req.params

        const {title, description, type, startDate, endDate} = req.body

        if(verifyToken.status != 'organiser')
            return res.status(400).json({status: "error", error: "The only organiser can update a event!"})

        await Event.UpdateEvent(event_id, title, description, type, startDate, endDate)

        return res.status(200).json({ status: "success", success: "Event updated!"})
    }

    async DeleteEvent(req, res){
        const { token } = req.cookies

        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const verifyToken = TokenService.validateAccessToken(token)

        const { event_id } = req.params

        if(verifyToken.status != 'organiser')
            return res.status(400).json({status: "error", error: "The only organiser can delete a event!"})

        await Event.DeleteEvent(event_id)

        return res.status(200).json({ status: "success", success: "Event deleted!"})
    }

    async OneEvent(req, res){
        const { token } = req.cookies

        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const verifyToken = TokenService.validateAccessToken(token)

        const { event_id } = req.params

        const event = await Event.SelectEvent(event_id)

        if(!event[0]) return res.status(400).json({ status: "error", error: "Event not founded!" })
           
        return res.status(200).json({ status: "success", success: "Info of event!", info: event[0]})
    }

    async SearchByStartDate(req, res){
        const { startDate } = req.body

        const events = await Event.SelectEventsBySDate(startDate)

        return res.status(200).json({ status: "success", success: "Info of events with start date!", info: events})
    }

    async SearchByEndDate(req, res){
        const { endDate } = req.body

        const events = await Event.SelectEventsByEDate(endDate)

        return res.status(200).json({ status: "success", success: "Info of events with end date!", info: events})
    }

    async SearchByType(req, res){
        const { type } = req.body

        const events = await Event.SelectByStatus(type)

        return res.status(200).json({ status: "success", success: "Info of events with the type!", info: events})
    }
}

module.exports = new EventController