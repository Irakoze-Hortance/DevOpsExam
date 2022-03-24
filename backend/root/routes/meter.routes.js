const express=require('express')
const meterController=require('../Controllers/meterController')
const router=express.Router()
router.post('/buy',meterController.create)
router.get('/meter',meterController.meterToken)
router.delete('delete',meterController.deleteMeter)

module.exports=router