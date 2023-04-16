const db = require('../database.js')

class Event{

    async allEvents(){
        const data = await db('event')
            .select('*');
        return data
    }

    async createEvent(organiser_id, title, description, type, startDate, endDate, price, adress){
        const data = await db('event')
            .insert({
                organiser_id: organiser_id,
                title: title,
                type: type,
                description: description,
                startDate: startDate,
                endDate: endDate,
                price: price,
                address: adress
            })

        return data
    }


    async UpdateEvent(event_id, title, description, type, startDate, endDate, price, address){
        const data = await db('event')
            .update({
                title: title,
                type: type,
                description: description,
                startDate: startDate,
                endDate: endDate,
                price: price,
                address: address
            })
            .where('event_id', '=', event_id)

        return data
    }

    async SelectUserById(organiser_id){
        const data = await db('organiser')
            .select('*')
            .where('organiser_id', '=', organiser_id)
            .leftJoin('user', 'user.user_id', 'organiser.user_id')
        return data
    }

    async SelectEvent(event_id){
        const data = await db('event')
            .select('*')
            .where('event_id', '=', event_id)
        
            return data
    }

    async SelectEventsBySDate(startDate){
        const data = await db('event')
            .select('*')
            .where('startDate', '=', startDate)
        
            return data
    }

    async SelectEventsByEDate(endDate){
        const data = await db('event')
            .select('*')
            .where('endDate', '=', endDate)
        
            return data
    }


    async DeleteEvent(event_id){
        const data = await db('event').where('event_id', '=', event_id).del()

        return data
    }

    async SelectByStatus(type){
        const data = await db('event')
            .select('*')
            .where('type', '=', type)
        
        return data
    }
}

module.exports = new Event()