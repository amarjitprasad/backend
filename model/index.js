require('dotenv').config();
const mongoose   = require('mongoose');
const Schema     = mongoose.Schema ;
const ObjectId   = mongoose.Types.ObjectId ;
const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');
const saltRounds = 10 ;
var   AutoIncrement = require('mongoose-sequence')(mongoose);   
var   authToken    = require('../utility/auth');

const model = {
    connect: async ()=>{
            let mongoUrl = `${process.env.MongoUrl}`;            
            mongoose.connect(mongoUrl, { useNewUrlParser: true });
            mongoose.set('useCreateIndex', true);
            db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', () => {
            console.log("connection created");
            model.create.user();
        });
    },
    create: {
        user : async()=>{
               let schema =  new mongoose.Schema({
                   UserId:{type : Number, unique: true},
                   title: {type : String, required: true},
                   firstName:{type : String, required: true},
                   lastName:{type: String, required: true},
                   email:{type: String, unique:true, required: true},
                   password:{type: String, required: true},
                   active_flag: { type: String, default: "Y" },
               });
               schema.plugin(AutoIncrement, {id: 'UserId_seq', inc_field:'UserId'});
               User = mongoose.model('UserInfo', schema);
        }
    },
    objects:{
        user : {
            create: async(param)=>{
                let token = await authToken.createToken(param);
                if(token){
                    if(authToken.verifyToken(token)){
                        var salt = bcrypt.genSaltSync(saltRounds);
                        var hash = bcrypt.hashSync(param.password, salt);
                        param.password = hash ;
                        try{
                            r = await User.create(param);
                        }
                        catch(e){
                            return {error : {type: 'error', text : e.message}}
                        }

                        if(!r){return {error :{type: 'error', text : 'can\'t create user !'}}}
                        return {message: {type: 'success'}, data :{token: token, user: r}}
                    }else{
                        return {error : {type: 'error', text : 'Token is not valid'}}
                    }
                }else{
                    return {error : {type: 'error', text : 'Token not found'}};
                }
            }
        }
    }

}

module.exports = model ;