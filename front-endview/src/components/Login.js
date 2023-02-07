import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
      const auth=localStorage.getItem("user");
      if (auth) {
        navigate('/')
      }
      // eslint-disable-next-line
    },[])
    const handleLogin=async()=>{
        console.warn(email,password);

        let result=await fetch('http://localhost:5000/login',{
          method:'post',
          body:JSON.stringify({email,password}),
          headers:{
            'content-Type':'application/json'
          }
        });
        
        result=await result.json();
        if(result){
          localStorage.setItem('user',JSON.stringify(result.user));
          localStorage.setItem('token',JSON.stringify(result.token));
          navigate("/");
        }else{
          alert("please enter correct details")
        }
    }  
  return (
    <div className="login">
        <h1>WeLcome to Login Page</h1>
      <input className="input-box" onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder='Enter email' />
      <input className="input-box" onChange={(e)=>setPassword(e.target.value)} value={password} type="text" placeholder='Enter password' />
      <button className='btn' onClick={handleLogin}>Login</button>            
    </div>
  )
}

export default Login
