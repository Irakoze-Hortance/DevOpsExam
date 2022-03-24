const express=require('express')
const meterController=require('../Controllers/meterController')
const router=express.Router()
router.post('/buy',meterController.BuyToken)
router.get('/meter',meterController.GetMeterNumber)

module.exports=router