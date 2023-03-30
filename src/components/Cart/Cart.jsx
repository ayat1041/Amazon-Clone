import React from "react";
import "./Cart.css";
const Cart = ({ cart }) => {
  // const cart = props.cart; //option 1
  // const {cart} = props; //option 2
  console.log(cart);
  let total = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    // shortcut solution
    // product.quantity = product.quantity || 1;
    total = total + (product.price*product.quantity);
    totalShipping = totalShipping + (product.shipping*product.quantity);
    quantity = quantity + product.quantity;
  }
  const tax= total*7/100;
  const grandTotal = total + totalShipping + tax;
  return (
    <div className="cart">
      <h4>Order Summary</h4>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${total}</p>
      <p>Total Shipping Charge: ${totalShipping}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <h6>Grand Total: <small>${grandTotal.toFixed(2)}</small></h6>
    </div>
  );
};
export default Cart;
