import React from 'react'
import '../style/home.css'
import '../style/layout.css';
import Header from '../components/header';
import Product from '../components/product_display';
import { FaHeart } from "react-icons/fa";
import Products from './pproduct';
import Help from './phelp';
import Contact from './pcontact';
import Footer from '../components/footer';



function Home() {
  return (
    <>
    <div className='container1'></div>
    <div className='container'>
       
     <Header/>
     <div className="home">
          <br></br>
          <Product/>
        </div>
   </div>
   <Footer/>
    </>
  )
}

export default Home 