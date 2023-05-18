import React from "react";
import "./ReviewItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const ReviewItem = ({ product, handleRemoveFromCart }) => {
  const { _id, name, price, quantity, shipping, img } = product;
  return (
    <div className="review-item">
      <img src={img} alt="" />
      <div className="review-details">
        <p className="product-title">{name}</p>
        <p>
          Price: <span className="orange-text">${price}</span>
        </p>
        <p>
          Order Quantity: <span className="orange-text">{quantity}</span>
        </p>
      </div>
      <button
        onClick={() => handleRemoveFromCart(_id)}
        className="button-delete"
      >
        <FontAwesomeIcon className="delete-icon" icon={faTrashCan} />
      </button>
    </div>
  );
};

export default ReviewItem;
