const express = require('express')
const userModel = require('../dao/model/user-model')

const sessionViewRouter = express.Router()

const sessionMiddleware = (req, res, next) => {
    if(req.session.user){
        return  res.redirect('profile')
    }
    return next()
}

const adminMiddleware = async (req, res, next) => {
    if (req.session.user && req.session.user.admin) {
        return next();
    } else {
        return res.status(403).json({ error: "Acceso no autorizado" });
    }
};

  sessionViewRouter.get('/dashboard', adminMiddleware, (req, res) => {
    return res.render('dashboard'); 
});

sessionViewRouter.get('/register', sessionMiddleware, (req, res)=> {
    return res.render('register')
})

sessionViewRouter.get('/login', sessionMiddleware, (req, res) => {
    return res.render('login')
})

sessionViewRouter.get('/profile', (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('login')
    }
  
    return next()
  }, (req, res) => {
    const user = req.session.user
    return res.render('profile', { user })
  })

module.exports = sessionViewRouter