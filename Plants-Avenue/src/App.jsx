import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Features from "./Components/Features/Features";
import Product from "../src/Components/Product/Product";
import Cart from "../src/Components/Cart/Cart";
import Banner from "../src/Components/Banner/Banner";
import Steps from "../src/Components/Steps/Steps";
import About from "../src/Components/About/About";
import Footer from "../src/Components/Footer/Footer";

function App() {

  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isExist = prevCart.find((item) => item.id === product.id);

      if (isExist) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  return (
    <>
      <Navbar cartCount={cart.length} setIsOpen={setIsOpen} />
      <div id="home"><Hero /></div>
      <Features />

      <div id="shop"><Product addToCart={addToCart} /></div>
      <Cart cart={cart} setCart={setCart} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Banner />
      <Steps />
      <div id="about"><About /></div>
      <div id="contact"><Footer /></div>
    </>
  );
}

export default App;