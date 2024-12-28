import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const location = useLocation();
  const product = location.state?.product; // Retrieve the product passed via state
  const dispatch = useDispatch();

  const [addons, setAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const productWithAddons = {
      ...product,
      addons,
      quantity,
    };

    dispatch(addToCart(productWithAddons));
    toast.success("Product added to cart successfully!"); // Using react-toastify here
  };

  const handleAddonChange = (addon) => {
    setAddons((prevAddons) =>
      prevAddons.includes(addon)
        ? prevAddons.filter((item) => item !== addon)
        : [...prevAddons, addon]
    );
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value) || 1);
  };

  if (!product) {
    return <p>Product not found! Please navigate from the home page.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-500 mb-2">${product.price}</p>
          <div className="flex items-center">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} className="text-yellow-500" />
            ))}
          </div>

          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Addons Section */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">Choose Addons</h4>
            <div className="flex flex-wrap gap-2">
              {['Cheese', 'Butter', 'Jalapenos', 'Extra Sauce'].map((addon) => (
                <button
                  key={addon}
                  className={`py-1 px-3 rounded-full border-2 transition ${addons.includes(addon)
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


          {/* Quantity Selector */}
          <div className="mt-4">
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;