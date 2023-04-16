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

    async getUserByIdParms(req, res, next){
        try{
            const { token } = req.cookies

            const {user_id} = req.params

            if(!token) res.status(400).json({status: "error", error: "The user is not authorized!"});

            const user = await User.getById(user_id)

            const org = await User.getByIdOrg(user_id)
    
            if(!user[0]) return res.status(400).json({status: "error", error: "User not founded!", user: user})
    
            return res.status(200).json({ status: "success", success: "User founded!", user: user, org: org})
        } catch (e){
            console.log(e)
            next(e)
           }
    }

    async getUserById(req, res, next){

       try{
        const { token } = req.cookies

        if(!token) res.status(400).json({status: "error", error: "The user is not authorized!"});

        const tokenData = TokenService.validateAccessToken(token)

        const user = await User.getById(tokenData.user_id)

        if(!user[0]) return res.status(400).json({status: "error", error: "User not founded!", user: user})

        return res.status(200).json({ status: "success", success: "User founded!", user: user, token: token })
       } catch (e){
        console.log(e)
        next(e)
       }
    }

    async userAvatar(req, res, next) {
        try{
            const { token } = req.cookies;

            console.log(req.file);
            // if(!token) res.status(400).json({status: "error", error: "The user is not authorized!"});
            // const tokenData = TokenService.validateAccessToken(token)

            // await User.updateAvatar(tokenData.user_id, req.file.filename);

            return res.status(200).json({status: "success", success: "Profile's picture loaded!", file: req.file?.filename });
        } catch (e){
            console.log(e)
            next()
        }
    }

    async updateUserData(req, res){
        const { token } = req.cookies

        if(!token) res.status(400).json({status: "error", error: "The user is not authorized!"});

        const {login, firstName, middleName, lastName, profileStatus } = req.body

        const tokenData = TokenService.validateAccessToken(token)

        await User.updateUserDate(tokenData.user_id, login, firstName, middleName, lastName, profileStatus);

        // const email_token = TokenService.generateTokens({email: email})

        // SendMail.send(email, email_token, 'profile_reset')

        return res.status(200).json({status: "success", success: "Data updated!" });
    }

    async deleteUser(req, res){
        const { token } = req.cookies

        if(!token) res.status(400).json({status: "error", error: "The user is not authorized!"});

        const { id } = req.params

        console.log(id)

        await User.deleteUser(id)

        // res.clearCookie('token', { secure: true, httpOnly: false });

        // res.clearCookie('status', { secure: true, httpOnly: false });

        return res.status(200).json({status: "success", success: "User deleted!"});
    }
}

module.exports = new userController