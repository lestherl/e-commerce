import Header from "../components/header";
import Product from "../components/product_display";
import Footer from "../components/footer";
import ProductCard from "../components/productCard";
import products from "../data/products.json";
import '../style/productList.css';
import '../style/layout.css';

function Products(){
    return(
        <>
        <Header/>
        <div className="container">
            <div className="products-page">
                <br></br>
                <h1 className="products-title">All Products</h1>
                <p className="products-subtitle">Browse our complete collection of presentation templates</p>
                <br></br>
                
                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default Products;