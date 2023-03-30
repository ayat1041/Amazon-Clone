import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
const Shop = () => {
  //   getting products from products.json and setting those products to products variable
  const [products, setProducts] = useState([]);
  //
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  //just printing the cart obj to see whats there
  useEffect(() => {
    const storedCart = getShoppingCart();
    console.log(storedCart);
  }, []);
  // declaring a function that takes a obj and adds that obj to newCart variable along with existing cart objects and updates localStorage
  const handleAddToCart = (product) => {
    // cart.push(product) //but it doesnt work in react as state is immutable
    const newCart = [...cart, product];
    // console.log("cart is -",cart)
    setCart(newCart);
    //just adding the product id; remember not the whole product
    addToDb(product.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
