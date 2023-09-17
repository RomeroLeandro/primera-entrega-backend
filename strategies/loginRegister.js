const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../dao/model/user-model');
const { isValidPassword }= require('../utils/passwordHash');

module.exports = new LocalStrategy(
    {usernameField: 'email'},
    async(email, password, done) => {
        try {
            let user = await userModel.findOne({email: email})
            if (!user) {
                console.log('Usuario inexistente')
                return done(null, false)
            }
            if(!isValidPassword(password, user.password)) {
                console.log('Los datos son incorrectos')
                return done(null, false)
            }
            user = user.toObject();
            delete user.password;
            done(null, user)
        } catch (e) {
            return done(e)
        }
    }
);