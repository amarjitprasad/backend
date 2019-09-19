const Model = require('../model').objects ;

const UserController = {
    create: async(req,res)=>{
        let r = await Model.user.create(req.body);
        if(r.error){
            return res.status(404).set('Content-Type', 'application/json').send(r.error) ;
        }else{
            return res.status(200).set('Content-Type', 'application/json').send(r);
        }
    },
    login: async(req, res)=>{
        let r = await Model.user.login(req.body);
        if(r.error){
            return res.status(404).set('Content-Type', 'application/json').send(r.error) ;
        }else{
            return res.status(200).set('Content-Type', 'application/json').send(r) ;  
        }
    },
    getUser: async(req,res)=>{
        let r = await Model.user.getUser();
        if(r.error){
            return res.status(404).set('Content-Type', 'application/json').send(r.error);
        }else{
            return res.status(200).set('Content-Type', 'application/json').send(r);
        }
    }

}

module.exports = UserController ;