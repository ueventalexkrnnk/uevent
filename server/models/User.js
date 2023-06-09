const db = require('../database.js')

class User{
    async findOneByLogin(login){
        const data = await db('user')
            .select(
                'user.user_id',
                'user.login'
            )
            .where('login', '=', login)

        return data
    }

    async findOneByEmail(email){
        const data = await db('user')
            .select(
                '*'
            )
            .where('email', '=', email)

        return data
    }

    async TakePasswordForReset(email){
        const data = await db('user')
            .select(
                'user.user_id'
            )
            .where('email', '=', email)

        return data
    }

    async createUser(login, password, email, firstName, lastName, middleName, profileStatus){
        const data = await db('user')
            .insert({
                login: login,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                status: profileStatus
            })

        return data
    }
    
    async findOneByLoginAndEmail(login, email){
        const data = await db('user')
            .select(
                'user.user_id',
                'user.login',
                'user.password',
                'user.email',
                'user.firstName',
                'user.lastName',
                'user.middleName',
                'user.status'
            )
            .where('login', '=', login).orWhere('email', '=', email)

        return data
    }

    async deleteUserToken(email){
        const data = await db('user')
            .update({ token: null})
            .where('email', '=', email)
        
        return data
    }

    async updateUserToken(user_id, token){
        const data = await db('user')
            .update({ token: token })
            .where('user_id', '=', user_id)

        return data
    }

    async resetPassword(user_id, password) {
        const data = await db('user')
            .update({password: password})
            .where('user_id', '=', user_id)

        return data
    }

    async updateAvatar(user_id, profile_pic){
        const data = await db('user')
            .insert({profile_pic: profile_pic})
            .where('user_id', '=', user_id)
        
        return data
    }

    async getAllUsers(){
        const data = await db('user')
            .select(
                'user.user_id',
                'user.login',
                'user.firstName',
                'user.moddleName',
                'user.lastName',
                'user.email',
                'user.profile_pic',
                'user.status'
            )

        return data;
    }

    async getById(user_id){
        const data = await db('user')
            .select('*')
            .where('user_id', '=', user_id);
        return data
    }

    async getByIdOrg(user_id){
        const data = await db('organiser')
            .select('*')
            .where('user_id', '=', user_id);
        return data
    }


    async findOne(columnName, value) {
        try {
            const data = await db('user')
                .select(
                    'user.user_id',
                    'user.login',
                    'user.password',
                    'user.middleName',
                    'user.lastName',
                    'user.firstName',
                    'user.email',
                    'user.profile_pic',
                    'user.status'
                )
                .where(columnName, '=', value);
            return { ...data[0] };
        } catch (err) {
            throw err;
        }
    }

    async deleteUser(user_id){
        const data = await db('user').where('user_id', '=', user_id).del();

        return data
    }

    async deleteUserToken(email){
        const data = await db('user')
            .update({ token: null})
            .where('email', '=', email)
        
        return data
    }

    async updateUserDate(user_id, login, firstName, middleName, lastName, profileStatus) {
        try {
            const data = await db('user')
            .where('user_id', '=', user_id)
            .update({
                login: login,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                // profileStatus: profileStatus,
                // profile_pic: profile_pic,
            })
            
            return data
        } catch (err) {
            throw err;
        }
      }
}

module.exports = new User()