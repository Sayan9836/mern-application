import './App.css';
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import AddProducts from './components/AddProducts';
import UpdateProducts from './components/UpdateProducts';
import Profile from './components/Profile';
import Logout from './components/Logout';
import Products from './components/Products';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
         <Route element={<PrivateComponent/>}>
         <Route path='/add' element={<AddProducts/>}/>
         <Route path='/update/:id' element={<UpdateProducts/>}/>
         <Route path='/Profile' element={<Profile/>}/>
         <Route path='/logout' element={<Logout/>}/>
         <Route path='/' element={<Products/>}/>
         </Route>
         <Route path='/signup' element={<SignUp/>}/>
         <Route path='/login' element={<Login/>} />
         </Routes>
         <Footer/>
    </div>
  );
}
    
export default App;
