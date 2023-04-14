const db = require('../database.js')

class Organiser{
    async getAllOrganiser(){
        const data = await db('organiser')
            .select('*')

        return data;
    }

    async getInfoByOrganiser(organiser_id){
        const data = await db('organiser')
            .select('*')
            .where('organiser_id', '=', organiser_id)

        return data;
    }

    async getOrganiserByUser(user_id){
        const data = await db('organiser')
            .select('*')
            .where('user_id', '=', user_id)
        
        return data
    }

    async insertDateOrganiser(user_id, title, description){
        const data = await db('organiser')
            .insert({
                user_id: user_id,
                title: title,
                description:description
            })

        return data
    }

    async updateStatus(user_id, status){
        const data = await db('user')
            .update({
                status: status
            })

        return data
    }

    async updateToken(token){
        const data = await db('user')
            .update({
                token: token
            })

        return data
    }

    async deleteOrganiserStatus(user_id){
        const data = await db('organiser')
            .del().where('user_id', '=', user_id)
        
        return data
    }

    async updateOrganiserData(user_id, title, description){
        const data = await db('organiser')
            .update({
                title: title,
                description: description
            })
            .where('user_id', '=', user_id)
        
        return data
    }
    
}

module.exports = new Organiser()