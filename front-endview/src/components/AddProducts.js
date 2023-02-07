import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
 const [name,setName]=useState("");
 const [price,setPrice]=useState("");
 const [category,setCategory]=useState("");
 const [company,setCompany]=useState("");
const navigate=useNavigate();
  const handleProduct=async()=>{
    const userId=JSON.parse(localStorage.getItem('user'))._id;

    let result=await fetch('http://localhost:5000/add-Product',{
      method:'post',
      body:JSON.stringify({name,price,category,company,userId}),
      headers:{
        'content-Type':'application/json',
        authorization: JSON.parse(localStorage.getItem('token'))
      },
    })
    result=await result.json();
    setName(" ");
    setPrice(" ");
    setCategory(" ");
    setCompany(" ");
    
    // console.log(result);
  }
  return (
    <div className="product">
      <h1>Add Product </h1>
      <input type="text" className="input-box" onChange={(e)=>setName(e.target.value)} value={name} placeholder='Enter product name' />
      <input type="text" className="input-box" onChange={(e)=>setPrice(e.target.value)} value={price} placeholder='Enter product price' />
      <input type="text" className="input-box" onChange={(e)=>setCategory(e.target.value)} value={category} placeholder='Enter product category' />
      <input type="text" className="input-box" onChange={(e)=>setCompany(e.target.value)} value={company} placeholder='Enter product company' />
      <button className="btn" onClick={handleProduct}>Submit</button>
    </div>
  )
}

export default AddProducts
