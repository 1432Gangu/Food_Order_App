import React from "react";
import { useNavigate } from "react-router-dom";
import AdminDashbord from '../../assets/Images/AdminDashbord.jpg';
import { RiLogoutBoxRLine } from "react-icons/ri"; // Logout icon
import { MdProductionQuantityLimits } from "react-icons/md"; // Production icon
import { MdOutlineAdd } from "react-icons/md"; // Add item icon
import { FaHotel } from "react-icons/fa";
import { FaHome } from "react-icons/fa";



const AdminDashboard = () => {
  const navigate = useNavigate(); // useNavigate hook to handle navigation

  // Handle logout
  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing session or token)
    navigate("/"); // Navigate to the Home page
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${AdminDashbord})` }}
    >
      {/* Logout Button at the top-left */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
      >
        <RiLogoutBoxRLine className="text-xl inline-block mr-2" />
        Logout
      </button>
      <a
              href="/home"
              className="absolute top-6 left-6 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
            >
              Home
            </a>

      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Restaurants */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center animate-fade-in">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              <MdProductionQuantityLimits className="text-3xl" /> {/* Production icon */}
            </div>
            <a
              href="/DeleteProductList"
              className="py-2 px-4 rounded hover:bg-blue-500 transition"
            >
              Food list
            </a>
          </div>

          {/* Total Items */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center animate-fade-in delay-200">
            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              <MdOutlineAdd className="text-3xl" /> {/* Add Item icon */}
            </div>
            {/* Add Item Section */}
            <button
              onClick={() => navigate("/ItemEdit")} // Navigates to the "ItemEdit" page
              className="py-2 px-4 rounded hover:bg-blue-500 transition flex items-center"
            >
               {/* Add Item icon */}
              Add New Item
            </button>
          </div>

          {/* Add New Restaurant */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center animate-fade-in">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              <FaHotel className="text-3xl" /> {/* Production icon */}
            </div>
            <a
              href="/RestaurantDetail"
              className="py-2 px-4 rounded hover:bg-blue-500 transition"
            >
              Add New Restaurant
            </a>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex items-center animate-fade-in">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              <FaHotel className="text-3xl" /> {/* Production icon */}
            </div>
            <a
              href="/AllRestaurants"
              className="py-2 px-4 rounded hover:bg-blue-500 transition"
            >
              Restaurants
            </a>
          </div>
         
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
