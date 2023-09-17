const GitHubStrategy = require('passport-github2')
const userModel = require('../dao/model/user-model')
const Cart = require('../dao/model/cart-model')
const config = require('../config/config')

module.exports = new GitHubStrategy({
    clientID: `${config.github.clientID}`,
    clientSecret: `${config.github.clientSecret}`,
    callbackURL: `${config.github.callbackURL}`,
  },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('Github strategy called') 
            const existingUser = await userModel.findOne({ $or: [{ email: profile._json.email }, { email: profile.emails[0].value }] })
            if (existingUser) {
                console.log('Usuario existente')
                return done(null, { _id: existingUser._id, user: existingUser })
            }
            console.log('Github Email', profile.emails)

            const createCart = async () => {
                try {
                    const newCart = await Cart.create({ products: [] })
                    return newCart
                } catch (error) {
                    throw error
                }
            }

            const newUser = await userModel.create({
                username: profile._json.login,
                name: profile._json.name,
                email: profile.emails[0].value,
            })

            const newCart = await createCart()
            newUser.cart = newCart._id
            await newUser.save()
            console.log('New user created', newUser)
            return done(null, { _id: newUser._id, user: newUser })
        } catch (e) {
            console.log('Error in github strategy', e)
            return done(e)
        }
    }
)
