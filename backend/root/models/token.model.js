const mongoose=require('mongoose')
const Joi=require('joi');
const { Meter } = require('./meter.model');
Joi.objectId=require('joi-objectid')(Joi)


const Token= new mongoose.Schema({
    code_number:String,
    issue_time:Date,
    duration:Number,
    status:{
        type:String,
        enum:["Active","Usable"]
    },
    meter_number:{
        type:Number,
        ref:"Meter"
    },
    amount:Number,

})

function validateToken(Token){
    const JoiSchema=Joi.object({
        amount:Joi.number().min(100).max(182500).required(),
        meter_number:Joi.number().required().min(6),

    }).options({abortEarly:false});
return JoiSchema.validate(Token)
}

module.exports.validateToken=validateToken;
module.exports.Token=mongoose.model('Token',Token);