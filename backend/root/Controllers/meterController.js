const db=require('../models')
const{Meter,validateMeterToken,validateMeter}=require("../models/meter.model")
const Token=require("../models/token.model")


function generateMeter(){
const suid=require("rand-token").suid
var meter=suid(8);
return meter;
}

function generateToken(){
  const regEx =/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

return regEx.test(str);
}

const create=(req,res)=>{
const error=validateMeter(req.body);
if(error){
    res.status(400).send("Something went wrong")
    return;
}

Meter.create({
meter_number:generateMeter(),
owner:req.body.owner,
amount:req.body.amount
})
.then((data) => {
    res.status(201).send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message ,
    });
  });
}

const meterToken=async(req,res)=>{
    const error=validateMeterToken(req.body);
    if (error) {
        res.status(400).send({ message: error.details[0].message });
        return;
      }

      if (!generateToken(req.body.token))
    return res.status(400).send({ message: "Invalid token" });

  const meter = await Meter.findOne({ code_number: req.body.meter_number });
  if (!meter) return res.status(404).send({ message: "Meter not found" });

  const token = await Token.findOne({
    meter_number: req.body.meter_number,
    code_number: req.body.token,
  });
  if (token.status == "Active")
    return res.status(400).send({ message: "In use" });

}
    const deleteMeter =(req, res) => {
        const number = req.params.number;
      
        Meter.findOneAndDelete({ code: number }, { useFindAndModify: false })
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: "Failed to delete",
              });
            } else {
              res.send({
                message: "Meter  deleted successfully!",
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Something went wrong",
            });
          });
      };



module.exports={
  deleteMeter,
  meterToken,
  create
}