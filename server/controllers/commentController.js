const Comment = require('../models/Comment')
const TokenService = require('../services/token-service.js')

class commentController{
    async CreateComment(req, res){
        const { token } = req.cookies

        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const { content, event_id} = req.body

        const verifyToken = TokenService.validateAccessToken(token)

        const data = await Comment.createComment(content, verifyToken.user_id)
        
        await Comment.createCommentEvent(data[0], event_id)

        return res.status(200).json({ status: "success", success: "Comment created!"})
    }

    async UpdateComment(req, res){
        const { token } = req.cookies

        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const { content, comment_id } = req.body

        const verifyToken = TokenService.validateAccessToken(token)

        await Comment.updateComment(comment_id, verifyToken.user_id, content)

        return res.status(200).json({ status: "success", success: "Comment updated!"})
    }

    async DeleteComment(req, res){
        const { token } = req.cookies

        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const { comment_id } = req.body

        const verifyToken = TokenService.validateAccessToken(token)

        await Comment.deleteComment(comment_id, verifyToken.user_id)
        
        await Comment.deleteCommentEvent(comment_id)

        return res.status(200).json({ status: "success", success: "Comment deleted!"})
    }

    async ShowComments(req, res){
        const { token } = req.cookies

        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const { event_id } = req.body

        const data = await Comment.showCommentsEvent(event_id)

        return res.status(200).json({ status: "success", success: "Comments shown!", data: data})
    }
}

module.exports = new commentController