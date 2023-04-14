const bcrypt = require('bcryptjs')
const User = require('../models/User')
const SendMail = require('../services/send-mail.js')
const TokenService = require('../services/token-service.js')

class authController{    
    async registration(req, res, next){
        try{
            const {login, password, confirmPassword, email, firstName, middleName, lastName, profileStatus = 'user' } = req.body

            const checkLogin = await User.findOneByLogin(login);
            const checkEmail = await User.findOneByEmail(email);

            if(checkLogin[0])
                return res.status(400).json({status: "error", error: "User with this login was register!", data: checkLogin})
            if(checkEmail[0])
                return res.status(400).json({status: "error", error: "User with this email was register!", data: checkEmail})
            

            if(password !== confirmPassword) return res.status(400).json({status: "error", error: "Password and confirm password not equals!"})

            const hashPassword = await bcrypt.hash(password, 5)

            const token = TokenService.generateTokens({
                login,
                password: hashPassword,
                email,
                firstName,
                middleName,
                lastName,
                profileStatus
              });
              
            SendMail.send(email, token, 'activate');

            return res.status(200).json({ status: "success", success: "Mail sended!"})
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async activeEmail(req, res, next) {
        try {
            const { token } = req.params;
            const tokenData = TokenService.validateAccessToken(token);

            await User.createUser(tokenData.login, tokenData.password, tokenData.email, tokenData.firstName, tokenData.lastName,
                tokenData.middleName, tokenData.profileStatus);

            return res.status(200).json({ status: "success", success: "User has been registered!", data: tokenData})
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    
    async login(req, res, next){
        try{
            const {email, password} = req.body

            const checkEmail = await User.findOneByEmail(email);
            
            if(!checkEmail[0])
                return res.status(400).json({status: "error", error: "User not found with the email!", data: checkEmail})
            
            const user = await User.findOneByEmail(email)

            const token = TokenService.generateLoginTokens({
                user_id: user[0].user_id, 
                email: user[0].email, 
                login: user[0].login,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                middleName: user[0].middleName,
                status: user[0].status
             })
            
            res.cookie('token', token, {maxAge: 30 * 24 * 60 * 60 * 1000})

            res.cookie('status', user[0].status, {maxAge: 30 * 24 * 60 * 60 * 1000})
            
            const match = await bcrypt.compare(password, user[0].password)

            if(!match) return res.status(400).json({status: "error", error: "Invalid password!"})
                
            await User.updateUserToken(user[0].user_id, token)

            return res.status(200).json({status: "success", success: "User logged in!", auth: true})
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async logout(req, res, next){
        try{
            const { token } = req.cookies

            const verifyToken = TokenService.validateAccessToken(token)

            await User.deleteUserToken(verifyToken.email)

            res.clearCookie('token', { secure: true, httpOnly: true });

            return res.status(200).json({status: "success", success: "User logged out!"})
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async sendPasswordReset(req, res, next){
        try {   
            const { email } = req.body;

            const user = await User.TakePasswordForReset(email); 

            const token = TokenService.generateTokens({user_id: user[0].user_id})

            SendMail.send(email, token, 'reset')

            return res.json({ status: "success", success: 'Email sent!' });
        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    async tokenPasswordReset(req, res, next) {
        try {
            const { newPassword, confirm_newPassword } = req.body;

            if (newPassword !== confirm_newPassword) 
                return res.status(400).json({ status: "error", error: 'Password not equal confirm password!' , data:{
                    password: newPassword,
                    confirmPassword: confirm_newPassword
                }});
              
            const { token } = req.params;

            const hashPassword = await bcrypt.hash(newPassword, 5)

            const { user_id } = TokenService.validateAccessToken(token);

            await User.resetPassword(user_id, hashPassword);

            return res.status(200).json({ status: "success", success: 'Password reset!', newPassword: hashPassword});
        } catch (e) {
            console.log(e)
            next(e);
        }
    }
}

module.exports = new authController;