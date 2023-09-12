const passport = require('passport')
const passportLocal = require('passport-local')
const GitHubStrategy = require('passport-github2')
const userModel = require('../dao/model/user-model')
const {createHash, isValidPassword} = require('../utils/passwordHash')
const Cart = require('../dao/model/cart-model');

const LocalStrategy = passportLocal.Strategy

const initializepassport = () => {
    passport.use('register', new LocalStrategy(
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
      
            const newUser = await userModel.create(body); // Declarar newUser aquí
      
            const newCart = await createCart();
            newUser.cart = newCart._id;
            await newUser.save();
      
            return done(null, newUser);
          } catch (e) {
            return done(e);
          }
        }
      ));

    passport.use('login', new LocalStrategy(
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

                user = user.toObject()

                delete user.password

                done(null, user)
            }
        catch(e){
            return done(e)
        }}
    ))

    passport.use(
        'github',
        new GitHubStrategy(
          {
            clientID: 'Iv1.b55349d0f398286a',
            clientSecret: '6fe9ee4c3b3dbbddb1a5615d09f193ef5efab5d0',
            callbackURL: 'http://localhost:8080/api/sessions/github-callback',
          },
          async (accessToken, refreshToken, profile, done) => {
            let newUser; // Declarar newUser fuera del bloque try-catch
      
            try {
              console.log('GitHub Strategy called');
      
              const existingUser = await userModel.findOne({
                $or: [
                  { username: profile._json.login },
                  { email: profile.emails[0].value },
                ],
              });
      
              if (existingUser) {
                console.log('El usuario ya existe, pero vamos a autenticarlo');
                return done(null, { _id: existingUser._id, user: existingUser });
              }
      
              console.log('GitHub Email(s):', profile.emails);
      
              // Definición de la función createCart directamente aquí
              const createCart = async () => {
                try {
                  const newCart = await Cart.create({ products: [] }); // Inicializa el carrito según tus necesidades
                  return newCart;
                } catch (error) {
                  throw error;
                }
              };
      
              // Crear un usuario y asignarle un carrito
              newUser = await userModel.create({
                username: profile._json.login,
                name: profile._json.name,
                email: profile.emails[0].value,
              });
      
              const newCart = await createCart(); // Llama a la función para crear el carrito
              newUser.cart = newCart._id;
              await newUser.save();
      
              console.log('Nuevo Usuario:', newUser);
              return done(null, { _id: newUser._id, user: newUser });
            } catch (e) {
              console.error('Error en la estrategia de GitHub:', e);
              return done(e);
            }
          }
        )
      );
      

    passport.serializeUser((user, done) =>{
        console.log('serializeUser')
        done(null, user._id)
    })

    passport.deserializeUser(async (serializedData, done) => {
        console.log('deserializedUser');
        try {
            const user = await userModel.findById(serializedData._id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
}

module.exports = initializepassport