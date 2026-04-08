import React from 'react'
import Header from './components/header';
import Product from './components/product_display';
import { FaHeart } from "react-icons/fa";
import { Routes, Route } from 'react-router-dom';
import Products from './pages/pproduct';
import Help from './pages/phelp';
import Contact from './pages/pcontact';
import Home from './pages/phome';
import Favorites from './pages/pfavorites';
import Cart from './pages/pcart';
import User from './pages/puser';


function App() {
  return (
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product'element={<Products/>}/>
          <Route path='/help' element={<Help/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/user' element={<User/>}/>
       </Routes>
  )
}
export default App