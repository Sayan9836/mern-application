import React from 'react'
import {  Link, Navigate } from 'react-router-dom'
const Navbar = () => {
  const auth = localStorage.getItem('user');
  const logout = () => {
    localStorage.clear();
    Navigate('/signup');
  }
  return (
    <div>
      <img className="logo" src="https://icon2.cleanpng.com/20171220/dee/apple-logo-png-5a3a274a66b786.45266713151376058642073727.jpg" alt="logo" />
      {auth ?
        <ul className='nav-ul'>
          <li><Link to='/'>Products</Link></li>
          <li><Link to='/add'>Add Product</Link></li>
          <li><Link to='/update'>Update Product</Link></li>
          <li><Link to='/profile'>Profile</Link></li>
          <li><Link to="/login" onClick={logout}>Logout {JSON.parse(auth).name}</Link></li>
        </ul>
        :
        <ul className="nav-ul right">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      }
    </div>
  )
}

export default Navbar
