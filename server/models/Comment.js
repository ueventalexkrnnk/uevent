const db = require('../database.js')

class Comment{
    async createComment(content, user_id){
        const data = await db('comment')
            .insert({
                content: content,
                user_id: user_id
            })

        return data
    }

    async updateComment(comment_id, user_id, content){
        const data = await db('comment')
            .update({
                content: content
            })
            .where('comment_id', '=', comment_id)
            .andWhere('user_id', '=', user_id)
        
        return data
    }

    async deleteComment(comment_id, user_id){
        const data = db('comment')
            .where('comment_id', '=', comment_id)
            .andWhere('user_id', '=', user_id).del()

        return data
    }

    async deleteCommentEvent(comment_id){
        const data = db('comment_event')
            .where('comment_id', '=', comment_id).del()
        
        return data
    }

    async createCommentEvent(comment_id, event_id){
        const data = await db('comment_event')
            .insert({
                comment_id: comment_id,
                event_id: event_id
            })


        return data
    }

    async showCommentsEvent(event_id){
        const data = await db('comment')
            .select('*')
            .leftJoin('comment_event', 'comment.comment_id', 'comment_event.comment_id')
            .where('event_id', '=', event_id)
            
        return data
    }
}

module.exports = new Comment()