const bcrypt = require('bcryptjs')
const User = require('../models/User')
const TokenService = require('../services/token-service.js')

class userController{
    async getAllUsers(req, res){
        const { token } = req.cookies

        if(!token) return res.status(400).json({ status: "error", error: "Register or log in!" })

        const user = await User.getAllUsers()

        return res.status(200).json({ status: "success", success: "List of users formed", users: user })
    }

    async getUserById(req, res){
        const { user_id } = req.params

        const user = await User.getById(user_id)

        if(!user[0]) return res.status(400).json({status: "error", error: "User not founded!", user: user})

        return res.status(200).json({ status: "success", success: "User founded!", user: user })
    }

    async userAvatar(req, res){
        const { token } = req.cookies

        if(!token) res.status(400).json({status: "error", error: "The user is not authorized!"});

        return res.status(200).json({status: "success", success: "Profile's picture loaded!", file: req.file.path });
    }

    async updateUserData(req, res){
        const newData = req.body
        const { token } = req.cookies

        if(!token) res.status(400).json({status: "error", error: "The user is not authorized!"});

        const tokenData = TokenService.validateAccessToken(token)

        const hashPassword = await bcrypt.hash(newData.password, 5)

        await User.updateUserDate(tokenData.user_id, { ...newData, password: hashPassword });

        return res.status(200).json({status: "success", success: "Data updated!", newData: newData });
    }

    async deleteUser(req, res){
        const { token } = req.cookies

        if(!token) res.status(400).json({status: "error", error: "The user is not authorized!"});
        
        const tokenData = TokenService.validateAccessToken(token)

        await User.deleteUser(tokenData.user_id)

        return res.status(200).json({status: "success", success: "User deleted!", data: tokenData });
    }
}

module.exports = new userController