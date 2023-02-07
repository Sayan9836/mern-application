import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const navigate=useNavigate();

  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if (auth) {
      navigate('/product')
    }
  })

  const CollectData=async()=>{
    let result=await fetch('http://localhost:5000/register',{
         method:'post',
         body:JSON.stringify({name,email,password}),
         headers:{
          'content-Type':'application/json'
         },
    })
    result= await result.json();
    console.warn();
    navigate('/products');
    localStorage.setItem('user',JSON.stringify(result))
  }
  return (
    <div className='register'>
      <h1>Register</h1>
      <input className='input-box'onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Enter Name'/>
      <input className='input-box'onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Enter Email'/>
      <input className='input-box'onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Enter password' />
      <button className='btn' onClick={CollectData}>SignUp</button>
    </div>
  )
}

export default SignUp
