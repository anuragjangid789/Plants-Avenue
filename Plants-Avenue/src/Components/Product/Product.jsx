import "./Product.css"
import Productdata from "../Product/Productdata";
import {useState} from "react";


function Products({ addToCart }) {

    const [showPopup, setShowPopup] = useState(false);

    const handleAddToCart = (item) => {
        addToCart(item);
        setShowPopup(true);

        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };  

    return (
        <section className="products">
            <div className="container">
                <h2 className="product-title">⸺ Our Plants ⸺</h2>

                {showPopup && (
                    <div className="added-popup">
                        🌿 Added to Cart successfully!
                    </div>
                )}

                <div className="products-slider">
                    {Productdata.map((item) => (
                        <div className="product-card" key={item.id}>


                            <img src={item.image} alt={item.name} />


                            <div className="product-info">
                                <h3>{item.name}</h3>
                                <p>${item.price}</p>

                                <button onClick={() => handleAddToCart(item)}>
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