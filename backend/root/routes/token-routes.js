const express=require('express')
const tokenController=require('../Controllers/Token.controller')
const router=express.Router()
router.post('/new',tokenController.create)
router.get('/find',tokenController.findOne)

module.exports=router