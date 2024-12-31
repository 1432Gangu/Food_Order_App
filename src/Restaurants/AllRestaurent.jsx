import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/v1/restaurants/getAllRestaurants");
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant data");
      }
      const data = await response.json();
      setRestaurants(data.restaurants || []);
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/restaurants/deleteRestaurant/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete restaurant");
      }

      alert("Restaurant deleted successfully!");
      setRestaurants((prevRestaurants) => prevRestaurants.filter((restaurant) => restaurant.id !== id)); // Use `id` here
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (restaurant) => {
    const updatedName = prompt("Enter new restaurant name:", restaurant.RestaurantName);
    const updatedLocation = prompt("Enter new restaurant location:", restaurant.location);
    const updatedContact = prompt("Enter new restaurant contact:", restaurant.contactNumber);
    const updatedEmail = prompt("Enter new restaurant email:", restaurant.email);
    const updatedDescription = prompt("Enter new restaurant description:", restaurant.description);

    if (!updatedName || !updatedLocation || !updatedContact || !updatedEmail || !updatedDescription) return;

    const updatedRestaurant = {
      ...restaurant,
      RestaurantName: updatedName,
      location: updatedLocation,
      contactNumber: updatedContact,
      email: updatedEmail,
      description: updatedDescription,
    };

    updateRestaurant(restaurant.id, updatedRestaurant); // Use `id` here
  };

  const updateRestaurant = async (id, updatedRestaurant) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/restaurants/updateRestaurant/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRestaurant),
      });

      if (!response.ok) {
        throw new Error("Failed to update restaurant");
      }

      alert("Restaurant updated successfully!");
      fetchRestaurants(); // Refresh the restaurant list
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoBack = () => {
    navigate("/AdminDashboard"); // Navigate to the Admin Dashboard
  };

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading restaurants...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 shadow-lg rounded-lg">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Restaurant Management</h2>
      <button
        onClick={handleGoBack}
        className="py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300"
      >
        Back to Dashboard
      </button>
      <div className="overflow-x-auto mt-8 bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse table-auto text-sm text-gray-700">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="px-8 py-4 font-medium text-left">#</th> {/* Restaurant number */}
              <th className="px-8 py-4 font-medium text-left">Restaurant Name</th>
              <th className="px-8 py-4 font-medium text-left">Contact Number</th>
              <th className="px-8 py-4 font-medium text-left">Email</th>
              <th className="px-8 py-4 font-medium text-left">Description</th>
              <th className="px-8 py-4 font-medium text-left">Location</th>
              <th className="px-8 py-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {restaurants.map((restaurant, index) => (
              <tr key={restaurant.id} className="hover:bg-indigo-50 transition-all">
                <td className="px-8 py-4">{index + 1}</td> {/* Restaurant number */}
                <td className="px-8 py-4">{restaurant.RestaurantName}</td>
                <td className="px-8 py-4">{restaurant.contactNumber}</td>
                <td className="px-8 py-4">{restaurant.email}</td>
                <td className="px-8 py-4">{restaurant.description}</td>
                <td className="px-8 py-4">{restaurant.location}</td>
                <td className="px-8 py-4 text-center">
                  <button
                    onClick={() => handleEdit(restaurant)}
                    className="mr-3 py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(restaurant.id)}
                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRestaurants;
