import "./Product.css"
import Productdata from "../Product/Productdata";


function Products({ addToCart }) {
    return (
        <section className="products">
            <div className="container">
                <h2 className="product-title">⸺ Our Plants ⸺</h2>

                <div className="products-slider">
                    {Productdata.map((item) => (
                        <div className="product-card" key={item.id}>


                            <img src={item.image} alt={item.name} />


                            <div className="product-info">
                                <h3>{item.name}</h3>
                                <p>${item.price}</p>

                                <button onClick={() => addToCart(item)}>
                                    Add to Cart
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Products;