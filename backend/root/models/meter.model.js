const mongoose=require('mongoose')
const Joi=require('joi')
const Schema = mongoose.Schema

const Meter=new Schema({
    meter_number:Number,
    amount:Number,
    owner:String
},
{timestamps:true})

function validateMeter(Meter){
    const JoiSchema=Joi.object({
        meter_number:Joi.number().min(6).max(6).required(),
        owner:Joi.string().required(),
        amount:Joi.number().min(100).max(182500).required(),

    }).options({abortEarly:false})
}

function validateMeterToken(body){
return Joi.object({
    token:Joi.string().required(),
    meter_number:Joi.number().min(6).required()
}).validate(body)
}
module.exports.Meter=mongoose.model('Meter',Meter);
module.exports.validateMeter=validateMeter;
module.exports.validateMeterToken=validateMeterToken;
