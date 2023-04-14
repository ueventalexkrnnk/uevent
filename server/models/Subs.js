const db = require('../database.js')

class Subs{
    async CheckSubOrganiser(organiser_id, user_id){
        const data = await db('user_organiser_sub')
            .select('*')
            .where('organiser_id', '=', organiser_id)
            .andWhere('user_id', '=', user_id)

        return data
    }

    async CreateSubOrganiser(organiser_id, user_id){
        const data = await db('user_organiser_sub')
            .insert({
                organiser_id: organiser_id,
                user_id: user_id
            }) 

        return data
    }

    async DeleteSubOrganiser(organiser_id, user_id){
        const data = await db('user_organiser_sub')
            .del()
            .where('organiser_id', '=', organiser_id)
            .andWhere('user_id', '=', user_id)
        
        return data
    }

    async CheckSubEvent(event_id, user_id){
        const data = await db('user_event_sub')
            .select('*')
            .where('event_id', '=', event_id)
            .andWhere('user_id', '=', user_id)

        return data
    }

    async CreateSubEvent(event_id, user_id){
        const data = await db('user_event_sub')
            .insert({
                event_id: event_id,
                user_id: user_id
            }) 

        return data
    }

    async DeleteSubEvent(event_id, user_id){
        const data = await db('user_event_sub')
            .del()
            .where('event_id', '=', event_id)
            .andWhere('user_id', '=', user_id)
        
        return data
    }

}

module.exports = new Subs