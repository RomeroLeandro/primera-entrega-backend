const express = require('express')
const userModel = require('../dao/model/user-model')

const sessionRouter = express.Router()

sessionRouter.get('/',(req, res) =>{
    return res.json(req.session)
    if(!req.session.counter){
        req.session.counter = 1
        req.session.name = req.query.name

        return res.json(`bienvenido ${req.session.name}`)
    } else {
        req.session.counter++
        return res.json(`${req.session.name} has visitado la pagina ${req.session.counter} veces`)
    }
})

sessionRouter.post('/register', async (req, res) => {
    const { name, lastName, email, age, password, admin } = req.body;

    const user = await userModel.create({
        name,
        lastName,
        email,
        age,
        password,
        admin: admin === 'true'
    });

    return res.redirect('/sessions/profile');
});

sessionRouter.post('/login', async (req, res) => {
    console.log("Login route accessed");
    console.log("req.body:", req.body);
    let user = await userModel.findOne({email: req.body.email});

    if(!user){
        return res.status(401).json({
            error: 'El usuario no existe'
        });
    }

    if(user.password !== req.body.password) {
        return res.status(401).json({
            error: 'Los datos son incorrectos'
        });
    }

    user = user.toObject();

    delete user.password;

    req.session.user = user;

    return res.redirect('/products');
})

sessionRouter.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).json({ error: "Error al cerrar sesión" });
        }
        return res.redirect('/sessions/login'); 
    });
});

module.exports = sessionRouter