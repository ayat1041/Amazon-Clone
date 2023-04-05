import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCartShopping, faCreditCard, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const Shop = () => {
  //   getting products from products.json and setting those products to products variable
  const [products, setProducts] = useState([]);
  //for step 4
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  //just printing the cart obj to see whats there
  useEffect(() => {
    //it wont show the products as products.json might not be yet loaded and this useeffect has already been executed
    //thats why we set dependency
    //though first time it will run by default and 2nd time it will run whenever products value changes
    // console.log('products',products);
    const storedCart = getShoppingCart();
    const savedCart = [];
    // console.log("stored cart",storedCart);
    // step 1 : get id
    for (const id in storedCart) {
      // console.log(id)
      //step 2 : get the product using id ; we used find as its obvious that only one unique id will be there
      const addedProduct = products.find((product) => product.id === id);
      // console.log(addedProduct);
      // step 3: get quantity of the product
      // for dependency first addedProduct is empty to handle that error we use if
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        //step 4 saveCart ; make a new array with all the objects we have in local storage with all its properties
        savedCart.push(addedProduct);
        // console.log(addedProduct);
      }
      //step 4 contd
    }
    setCart(savedCart);
  }, [products]);
  // declaring a function that takes a obj and adds that obj to newCart variable along with existing cart objects and updates localStorage
  const handleAddToCart = (product) => {
    // cart.push(product) //but it doesnt work in react as state is immutable
    // const newCart = [...cart, product];
    let newCart = [];
    //if product doesnt exist in the cart then set quantity = 1
    //if exists update the quantity by 1
    // console.log("cart is -",cart)
    const exists = cart.find((pd) => pd.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    //just adding the product id; remember not the whole product
    addToDb(product.id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
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
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link to="/orders">
            <button className="btn-proceed">Review Order
            <FontAwesomeIcon className="proceed-icon" icon={faArrowRight} />
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
