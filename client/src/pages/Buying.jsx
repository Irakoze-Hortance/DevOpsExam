import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils";
import Input from "../components/Input";
import Button from "../components/Button";

const Buying = ()=>{
 
  const [buyingData, setbuyingData] = useState({
    amount: 0,
    meter_number: ""
  })
  const [ error, setErorr ] = useState("")
  const [ isSuccess, setIsSucess ] = useState(false)
  const [ token, setToken ] = useState()

  const handleChange = (e)=>{
    var name = e.target.name;
    var value = e.target.value;
    setbuyingData({ ...buyingData, [name]: value });
  }
  const handleBuy = (e)=>{
    e.preventDefault();
  
    axios.post(`${BASE_URL}/buy`, buyingData)
    .then((data)=>{
      setErorr("")
      setIsSucess(true)
      setToken(data.body.token)
    })
    .catch((error)=>{
      setIsSucess(false)
      setErorr(error.response.data.message)
    })
  }

return(
<div>

<h1>Buy Electricty</h1>
        {error !== "" && <div >{error}</div>}
        {isSuccess &&
            <div>Sucessfully  bought a token :{token} ..</div>}


  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleBuy}>

    <div>
      <Input 
      label={"Amount of money"}
      placeholder="Amount Of Money"
      name = "amount"
      type="number"
      handleOnChange={handleChange}/>

      <input 
       handleOnChange={handleChange}
       name ="meter_number"
      label={"Meter Number"} placeholder="Meter Number"/>


    <div className="flex items-center justify-between">
      <Button  type="submit" label={"Buy Token"}/>

      <Link to="/verifyToken"  href="#">
        Check Token Here
    </Link>
    </div>
    </div>

  </form>
  
</div>
)
        }


export default Buying;