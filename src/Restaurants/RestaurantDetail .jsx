import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLogin from "../assets/Images/AdminLogin.jpg";

const RestaurantDetail = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState(null);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    location: "",
    contactNumber: "",
    email: "",
    description: "",
  });
  const [errors, setErrors] = useState({}); // Validation errors state

  useEffect(() => {
    // Mocked data for demonstration
    const fetchedRestaurant = {
      id,
      name: `Restaurant ${id}`,
      location: `Location for Restaurant ${id}`,
      contactNumber: `+1-800-1234-${id}`,
      email: `restaurant${id}@example.com`,
      description: `Description for Restaurant ${id}`,
    };
    setRestaurant(fetchedRestaurant);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant({
      ...newRestaurant,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newRestaurant.name.trim()) newErrors.name = "Restaurant name is required.";
    if (!newRestaurant.location.trim()) newErrors.location = "Location is required.";
    if (!newRestaurant.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^\+?\d{10,15}$/.test(newRestaurant.contactNumber)) {
      newErrors.contactNumber = "Enter a valid contact number (10-15 digits).";
    }
    if (!newRestaurant.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newRestaurant.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!newRestaurant.description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submission if validation fails
    const addedRestaurant = { ...newRestaurant, id: Date.now().toString() };
    setRestaurant(addedRestaurant);
    setNewRestaurant({
      name: "",
      location: "",
      contactNumber: "",
      email: "",
      description: "",
    });
    setErrors({});
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${AdminLogin})` }}
    >
      {/* Restaurant Details */}
      <div className="w-full max-w-md bg-white bg-opacity-40 p-4 rounded-lg shadow-lg backdrop-blur-md flex flex-col justify-between">
        <h1 className="text-3xl font-bold text-gray-800">{restaurant.name}</h1>
        <p className="mt-4 text-gray-600">{restaurant.description}</p>
        <div className="mt-6 space-y-2 text-gray-700">
          <p><strong>Location:</strong> {restaurant.location}</p>
          <p><strong>Contact:</strong> {restaurant.contactNumber}</p>
          <p><strong>Email:</strong> {restaurant.email}</p>
        </div>
      </div>

      <div className="mt-6 w-full max-w-md bg-white bg-opacity-60 shadow-lg rounded-lg p-4">
  <h2 className="text-xl font-semibold text-gray-800 mb-3">Add a New Restaurant</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-800" htmlFor="name">
        Restaurant Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={newRestaurant.name}
        onChange={handleInputChange}
        className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 text-sm ${errors.name ? "border-red-500" : "border-gray-300"}`}
        placeholder="Enter restaurant name"
      />
      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-800" htmlFor="location">
        Location
      </label>
      <input
        type="text"
        id="location"
        name="location"
        value={newRestaurant.location}
        onChange={handleInputChange}
        className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 text-sm ${errors.location ? "border-red-500" : "border-gray-300"}`}
        placeholder="Enter location"
      />
      {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-800" htmlFor="contactNumber">
        Contact Number
      </label>
      <input
        type="text"
        id="contactNumber"
        name="contactNumber"
        value={newRestaurant.contactNumber}
        onChange={handleInputChange}
        className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 text-sm ${errors.contactNumber ? "border-red-500" : "border-gray-300"}`}
        placeholder="Enter contact number"
      />
      {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-800" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={newRestaurant.email}
        onChange={handleInputChange}
        className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 text-sm ${errors.email ? "border-red-500" : "border-gray-300"}`}
        placeholder="Enter email"
      />
      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-800" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={newRestaurant.description}
        onChange={handleInputChange}
        className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 text-sm ${errors.description ? "border-red-500" : "border-gray-300"}`}
        placeholder="Enter description"
      />
      {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
    </div>
    <button
      type="submit"
      className="w-full py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Add Restaurant
    </button>
  </form>
</div>

    </div>
  );
};

export default RestaurantDetail;
