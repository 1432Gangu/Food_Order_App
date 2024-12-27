import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
// import { addToCart } from '../redux/cartSlice';
import {addToCart} from "../redux/cartSlice"
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addons, setAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const productWithAddons = {
      ...product,
      addons,
      quantity,
    };

    dispatch(addToCart(productWithAddons));
    toast.success('Product added successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAddonChange = (addon) => {
    setAddons((prevAddons) =>
      prevAddons.includes(addon)
        ? prevAddons.filter((item) => item !== addon)
        : [...prevAddons, addon]
    );
  };

  const handleNavigate = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div
      className="bg-white p-4 shadow rounded relative border transform transition-transform duration-300 hover:scale-105"
      onClick={handleNavigate}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500">${product.price}</p>
      <div className="flex items-center mt-2">
        {[...Array(4)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </div>
      <div className="mt-4">
  <h4 className="font-medium mb-2">Choose Addons</h4>
  <div className="flex flex-wrap gap-2">
    {['Cheese', 'Butter', 'Jalapenos', 'Extra Sauce'].map((addon) => (
      <button
        key={addon}
        className={`py-1 px-3 rounded-full border-2 transition ${
          addons.includes(addon)
            ? 'bg-green-500 text-white border-green-500'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleAddonChange(addon);
        }}
      >
        {addon}
      </button>
    ))}
  </div>
</div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <div className="flex items-center space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            onClick={(e) => {
              e.stopPropagation();
              setQuantity((prev) => Math.max(prev - 1, 1));
            }}
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            onClick={(e) => {
              e.stopPropagation();
              setQuantity((prev) => prev + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div
        className="absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600 group text-white text-sm rounded-full hover:w-32 hover:bg-red-700 transition-all cursor-pointer"
        onClick={(e) => handleAddToCart(e)}
      >
        <span className="group-hover:hidden">+</span>
        <span className="hidden group-hover:block">Add to Cart</span>
      </div>
    </div>
  );
};

export default ProductCard;
