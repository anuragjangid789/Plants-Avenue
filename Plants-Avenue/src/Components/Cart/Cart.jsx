import "./Cart.css"

function Cart({ cart, setCart, isOpen, setIsOpen }) {

  const updateQuantity = (id, amount) => {
    const updated = cart.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCart(updated);
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>

        <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>

        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>No Items In the Cart</p>
        ) : (

          cart.map((item) => (

            <div className="cart-item" key={item.id}>

              <img src={item.image} alt={item.name} />

              <div className="cart-item-detail">
                <h4>{item.name}</h4>
                <p>${item.price} x {item.quantity}</p>

                <div className="qty-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>

              </div>

              <button className="delete-btn" onClick={() => removeItem(item.id)}>🗑️Remove</button>

            </div>
          ))
        )}
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="checkout">Checkout</button>
      </div>
    </>
  );
}
export default Cart;