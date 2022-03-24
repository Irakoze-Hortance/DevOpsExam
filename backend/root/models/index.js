const dbConf=require('../config/db.config')

const mongoose=require('mongoose')
mongoose.Promise=global.Promise;
const db={}

db.mongoose=mongoose;
db.url=dbConf.url;
module.exports=db;