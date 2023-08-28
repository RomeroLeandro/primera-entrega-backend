const passport = require('passport')
const GitHubStrategy = require('passport-github2')

const userModel = require('../dao/model/user-model')

const initializePassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID:'Iv1.b55349d0f398286a',
        clientSecret:'6fe9ee4c3b3dbbddb1a5615d09f193ef5efab5d0',
        callbackURL:'http://localhost:8080/api/sessions/github-callback',
    }, async(accsessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({username: profile._json.login})

            if(user){
                console.log('El usuario ya existe')
                return done(null, user)
            }

            const newUser = await userModel.create({
                username: profile._json.login,
                name: profile._json.name,
                email: profile._json.email,
                password: profile._json.password
            })

            return done(null, newUser)
        } catch(e) {
            return done(e)
        }
    }))

    passport.serializeUser((user, done) => {
        console.log({user})
        console.log('serializeUser')
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done) => {
        console.log('deserealizeUser')
        const user = await userModel.findOne({_id: id})
        done(null, user)
    })
}

module.exports = initializePassport