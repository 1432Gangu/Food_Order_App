import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';

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
    alert('Product added successfully!');
  };

  const handleAddonChange = (addon) => {
    setAddons((prevAddons) =>
      prevAddons.includes(addon)
        ? prevAddons.filter((item) => item !== addon)
        : [...prevAddons, addon]
    );
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
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
        <h4 className="font-medium">Choose Addons</h4>
        <div className="flex space-x-4 mt-2">
          <button
            className={`py-1 px-4 border rounded ${addons.includes('Cheese') ? 'bg-gray-300' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddonChange('Cheese');
            }}
          >
            Cheese
          </button>
          <button
            className={`py-1 px-4 border rounded ${addons.includes('Butter') ? 'bg-gray-300' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddonChange('Butter');
            }}
          >
            Butter
          </button>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            e.stopPropagation();
            handleQuantityChange(e);
          }}
          min="1"
          className="w-full mt-1 p-2 border rounded"
        />
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
