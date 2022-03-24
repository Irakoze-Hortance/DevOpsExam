const db=require("../models")
const {Token,validateToken}=require('../models/token.model')
const Meter=require('../models/meter.model')
const suid=require("rand-token").suid
var token=suid(8);

exports.create=async(req,res)=>{
  const error=validateToken(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  } else if (req.body.total_amount % 100)
    return res
      .send({ message: "Invalid amount" });

  const meter = await Meter.findOne({ code_number: req.body.meter_number });
  if (!meter)
  return res.status(404).send({
    message: "Meter Not Found",
  });
  Token.create({
    code_number:token,
    meter_number:req.body.meter_number,
    amount:req.body.amount,
    status:"Active"
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

exports.findOne = (req, res) => {
  const code = req.params.code;

  Token.findOne({ code })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message:"Token not found",
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Token not found",
      });
    });
};