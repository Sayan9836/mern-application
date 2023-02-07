import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
const UpdateProducts = () => {
 const [name,setName]=useState("");
 const [price,setPrice]=useState("");
 const [category,setCategory]=useState("");
 const [company,setCompany]=useState("");
 const params=useParams();
//  const navigate=useNavigate();

useEffect(()=>{
  getProduct();
  // eslint-disable-next-line
},[])
  const getProduct=async()=>{

    let result=await fetch(`http://localhost:5000/product/${params.id}`,{
      headers:{
         authorization: JSON.parse(localStorage.getItem('token'))
      }
    })
    result=await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);  
  }

  const UpdateProduct=async()=>{
    let result=await fetch(`http://localhost:5000/product/${params.id}`,{
      method:'put',
      body:JSON.stringify({name,price,category,company}),
      headers:{
        "content-Type":"application/json",
         authorization: JSON.parse(localStorage.getItem('token'))
      }
    });
    result=await result.json();
      // navigate('/');
  }
  return (
    <div className="product">
      <h1>Add Product </h1>
      <input type="text" className="input-box" onChange={(e)=>setName(e.target.value)} value={name} placeholder='Enter product name' />
      <input type="text" className="input-box" onChange={(e)=>setPrice(e.target.value)} value={price} placeholder='Enter product price' />
      <input type="text" className="input-box" onChange={(e)=>setCategory(e.target.value)} value={category} placeholder='Enter product category' />
      <input type="text" className="input-box" onChange={(e)=>setCompany(e.target.value)} value={company} placeholder='Enter product company' />
      <Link to="/"><button className="btn" onClick={UpdateProduct}>Update</button></Link> 
    </div>
  )
}

export default UpdateProducts
