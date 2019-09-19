const express = require('express');
const jwt     = require('jsonwebtoken');
const api     = express.Router();
const UserController = require('./controller/User');
const isAuth = require('./utility/verifyRoute');

require('./model/').connect();

const router = ()=>{
    api.post('/register',UserController.create);
    api.post('/login',UserController.login);
    api.get('/getUser', isAuth.isAuthenticated,UserController.getUser);
    return api ;
}

module.exports = router();

