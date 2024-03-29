const express    = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./app');
const cors = require('cors');
require('dotenv').config();

//Body parser midlleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors());
app.use('/api',api);

const port = process.env.PORT || 3000 ;

app.listen(port, ()=>{
        console.log(" server started ", port);
});

