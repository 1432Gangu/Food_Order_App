import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    // Fetch restaurant details using the ID (this can be an API call or mocked data)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate adding the new restaurant
    const addedRestaurant = { ...newRestaurant, id: Date.now().toString() }; // Unique ID for new restaurant
    setRestaurant(addedRestaurant); // Replace with the new restaurant
    setNewRestaurant({ name: "", location: "", contactNumber: "", email: "", description: "" }); // Reset the form
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{restaurant.name}</h1>
        <p className="mt-4 text-lg text-gray-600">{restaurant.description}</p>
      </div>

      {/* Restaurant Contact Info Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
        <div className="mt-4 space-y-2 text-lg text-gray-700">
          <p><strong>Location:</strong> {restaurant.location}</p>
          <p><strong>Contact Number:</strong> {restaurant.contactNumber}</p>
          <p><strong>Email:</strong> {restaurant.email}</p>
        </div>
      </div>

      {/* Add New Restaurant Form */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Restaurant</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-800" htmlFor="name">Restaurant Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newRestaurant.name}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border rounded-md bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-800" htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={newRestaurant.location}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border rounded-md bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-800" htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={newRestaurant.contactNumber}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border rounded-md bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-800" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newRestaurant.email}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border rounded-md bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-800" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newRestaurant.description}
              onChange={handleInputChange}
              className="mt-2 p-3 w-full border rounded-md bg-gray-50"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Restaurant
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantDetail;
