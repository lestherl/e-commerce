import products from '../product.json';
import { FaHeart } from "react-icons/fa";
import images from '../assets/images';
import { IoCart } from "react-icons/io5";

function Product(){

   return ( <div className='products'>
             {
                   products && products.map( product =>{
                        return(
                             <div className="product-card" id={product.id}>
                                <div className="product-poster">
                                    <img src={images[product.image]} alt={product.name} id={product.id}/>
                                    <div className="product-info">
                                        <h3 className='product-name'>{product.name}</h3>
                                        <h4 className='price'>₱ {product.price}</h4>
                                        <p className='description'>{product.description}</p>
                                    </div>
                                </div> 
                                <div className="product-overlay">
                                        <button className="favorite-btn">
                                        <FaHeart/>
                                        </button> 
                                        <button className="cart-btn">
                                        <IoCart/>
                                        </button> 
                                        <button className="buy-btn">
                                        Buy Now
                                        </button>
                                    </div>
                            </div>
                             
                        )
                    }) 
               } 
       </div>         
);
}
export default Product;