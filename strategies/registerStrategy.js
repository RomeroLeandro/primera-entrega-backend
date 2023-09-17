const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../dao/model/user-model');
const {createHash} = require('../utils/passwordHash');
const Cart = require('../dao/model/cart-model');

module.exports = new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
            if (user) {
                console.log('Usuario existente');
                return done(null, false);
            }

            const body = req.body;
            body.password = createHash(body.password);
            console.log({ body });

            const createCart = async () => {
                try {
                    const newCart = await Cart.create({ products: [] });
                    return newCart;
                } catch (error) {
                    throw error;
                }
            };

            const newUser = await userModel.create(body); 

            const newCart = await createCart();
            newUser.cart = newCart._id;
            await newUser.save();

            return done(null, newUser);
        } catch (e) {
            return done(e);
        }
    }
);