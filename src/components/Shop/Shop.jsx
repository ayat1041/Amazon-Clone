import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCartShopping,
  faCreditCard,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
const Shop = () => {
  //   getting products from products.json and setting those products to products variable
  const [products, setProducts] = useState([]);
  //for step 4
  const [cart, setCart] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { totalProducts } = useLoaderData();

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const pageNumbers = [...Array(totalPages).keys()];
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);

    fetch("http://localhost:5000/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        const savedCart = [];

        for (const id in storedCart) {
          const addedProduct = cartProducts.find(product => product._id === id);
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, []);
  // declaring a function that takes a obj and adds that obj to newCart variable along with existing cart objects and updates localStorage
  const handleAddToCart = (product) => {
    // cart.push(product) //but it doesnt work in react as state is immutable
    // const newCart = [...cart, product];
    let newCart = [];
    //if product doesnt exist in the cart then set quantity = 1
    //if exists update the quantity by 1
    // console.log("cart is -",cart)
    const exists = cart.find((pd) => pd._id === product._id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    //just adding the product id; remember not the whole product
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const options = [5, 10, 20];
  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };
  console.log(itemsPerPage);
  return (
    <>
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link to="/orders">
              <button className="btn-proceed">
                Review Order
                <FontAwesomeIcon className="proceed-icon" icon={faArrowRight} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>

      {/* pagination */}
      <div className="pagination">
        <p>
          curent page: {currentPage} and items per page: {itemsPerPage}
        </p>
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => setCurrentPage(number)}
          >
            {number+1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Shop;
