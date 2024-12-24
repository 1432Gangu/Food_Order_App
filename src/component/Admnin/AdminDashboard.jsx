import React from "react";
import AdminDashbord from '../../assets/Images/AdminDashbord.jpg';


const AdminDashboard = () => {
  return (
     <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${AdminDashbord})` }}
        >
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col animate-slide-in">
        <div className="p-6 text-2xl font-bold border-b border-blue-500">
          Admin Dashboard
        </div>
        <nav className="flex flex-col gap-4 p-4">
          <a
            href="/"
            className="py-2 px-4 rounded hover:bg-blue-500 transition"
          >
            Home
          </a>
          <a
            href="/RestaurantDetail"
            className="py-2 px-4 rounded hover:bg-blue-500 transition"
          >
            Add New Restaurant
          </a>
          <a
            href="/ItemEdit"
            className="py-2 px-4 rounded hover:bg-blue-500 transition"
          >
            Add Item
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Restaurants */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center animate-fade-in">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              10
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold">Total Restaurants</h3>
              <p className="text-gray-600">Number of restaurants added</p>
            </div>
          </div>

          {/* Total Items */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center animate-fade-in delay-200">
            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              25
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold">Total Items</h3>
              <p className="text-gray-600">Number of items available</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex items-center animate-fade-in">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              10
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold">Total Ordes</h3>
              <p className="text-gray-600">Number of Ordes added</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
