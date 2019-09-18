const express = require('express');
const jwt     = require('jsonwebtoken');
const api     = express.Router();
const UserController = require('./controller/User');

require('./model/').connect();

const router = ()=>{
    api.post('/register',UserController.create);
    return api ;
}

module.exports = router();

