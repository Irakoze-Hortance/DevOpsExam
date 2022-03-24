import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useRef } from 'react'

const VerifyToken=()=>{
    const [meter,setMeter]=useState(0)
    const [error,setErr]=useState("")
    const [success,setSuccess]=useState(false)
    const [days,setDays]= useState(0)

    const verifyElec=  async()=>{
        try{
            let {data}= await axios.get(`http://localhost:8000/api/meter/${meter}`)
            setErr("")
            setSuccess(true)
            setDays(data.duration)

        }catch(e){
            setSuccess(false)
            setErr(e.response.data.message)
        }
    }

    return(
        <div id='checkBalance'>
            <h1 className='text-3xl font-medium'>Check your Watts!!!</h1>
            {error!=="" &&
            <div className='text-red-600 font-medium'>{error}</div>
            }

            {success&& 
                <div className='text-green-600'>You have electricity for {days} days long </div>
            }
        </div>
    )

}
export default VerifyToken