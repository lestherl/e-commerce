import { Link } from 'react-router-dom';
import '../style/header.css';
import { FaHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { PiPresentationBold } from "react-icons/pi";
import Search from './search';
import CartWidget from './cartWidget';
import { useFavorites } from '../context/FavoritesContext';

function Header(){
    const { favoritesCount } = useFavorites();
    
    const handleSearch = (searchTerm) => {
        console.log('Searching for:', searchTerm);
        // Implement search functionality here
        // You can navigate to search results page or filter products
    };
    
    return(<div className='header'>
        <header className="navbar">
        <div className="logo"><span className='logoicon'><PiPresentationBold /></span><span id='logo'>presentable</span></div>
    
        <nav className="nav-links">
         <Link to ={"/"}>Home</Link>
          <Link to={"/product"}>Product</Link>
          
          <Link to={"/contact"}>Contact</Link>
        </nav>
    
        <div className="nav-actions">
         {/*<Search onSearch={handleSearch} placeholder="Search for products..." /> */} 
          <Link to="/favorites" className='opt heart-icon'>
            <FaHeart/>
            {favoritesCount > 0 && <span className="favorites-count">{favoritesCount}</span>}
          </Link>
          <CartWidget />
          <Link to="/user" className='opt'><FaUser/></Link>
        </div>
      </header>
    </div>)
}
export default Header