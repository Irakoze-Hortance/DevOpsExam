const express=require("express")
const bodyParser=require('body-parser')
const cors=require('cors')

require('./root/config/db.config')
const app=express()

const port=8000
const meterRoutes=require('./root/routes/meter.routes')
const tokenRoutes=require('./root/routes/token-routes')

const db=require('./root/models');
db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log('failed to connect',err)
})


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Welcome!")
})

app.use("/api",meterRoutes)
app.use("/api/token",tokenRoutes)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})