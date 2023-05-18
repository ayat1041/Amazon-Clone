import React from "react";
import Cart from "../Cart/Cart";
import { Link, useLoaderData } from "react-router-dom";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Orders.css";
import { useState } from "react";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCreditCard, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  // cart
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);
  // console.log(savedCart);

  const handleRemoveFromCart = (id) => {
    // console.log(id);
    const remaining = cart.filter((product) => product._id !== id);
    console.log(id);
    setCart(remaining);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };


  return (
    <div className="shop-container">
      <div className="review-container">
        {cart.map((product) => (
          <ReviewItem
            key={product._id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
          ></ReviewItem>
        ))}
        {/* <h2>Orders page: {products.length}</h2> */}
      </div>
      <div className="cart-container">
        <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link to="/checkout">
                <button className="btn-proceed">Proceed Checkout
                <FontAwesomeIcon className="proceed-icon" icon={faCreditCard} />
                </button>
            </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
