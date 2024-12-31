import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { addToCart } from '../redux/cartSlice';
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
      position: 'top-center',
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
      className="bg-white p-2 shadow rounded border transform transition-transform duration-300 hover:scale-105 text-sm"
      onClick={handleNavigate}
      style={{ width: '180px' }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <h3 className="font-medium text-sm truncate">{product.name}</h3>
      <p className="text-gray-500 text-sm mb-2">${product.price}</p>
      <div className="flex items-center mb-2">
        {[...Array(4)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500 text-xs" />
        ))}
      </div>
      <button
        className="w-full bg-red-600 text-white py-1 rounded text-xs hover:bg-red-700 transition"
        onClick={(e) => handleAddToCart(e)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
