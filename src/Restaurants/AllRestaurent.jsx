import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RBackground from "../assets/Images/RBackground.jpg";

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editedRestaurant, setEditedRestaurant] = useState({
    RestaurantName: "",
    location: "",
    contactNumber: "",
    email: "",
    description: "",
  });
  const navigate = useNavigate();

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
      setRestaurants((prevRestaurants) => prevRestaurants.filter((restaurant) => restaurant.id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (restaurant) => {
    setIsEditing(restaurant.id);
    setEditedRestaurant({
      RestaurantName: restaurant.RestaurantName,
      location: restaurant.location,
      contactNumber: restaurant.contactNumber,
      email: restaurant.email,
      description: restaurant.description,
    });
  };

  const handleSave = async (id) => {
    const updatedRestaurant = { ...editedRestaurant };

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
      fetchRestaurants();
      setIsEditing(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoBack = () => {
    navigate("/AdminDashboard");
  };

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading restaurants...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${RBackground})` }}
    >
      <div className="w-full flex justify-start px-4 mt-4">
        <button
          onClick={handleGoBack}
          className="py-2 px-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
      <div className="overflow-x-auto w-full max-w-6xl">
  <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
    <thead className="bg-gray-800 text-white">
      <tr>
        <th className="px-2 py-2 text-left">#</th>
        <th className="px-2 py-2 text-left">Restaurant Name</th>
        <th className="px-2 py-2 text-left">Contact Number</th>
        <th className="px-2 py-2 text-left">Email</th>
        <th className="px-2 py-2 text-left">Description</th>
        <th className="px-2 py-2 text-left">Location</th>
        <th className="px-2 py-2 text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="bg-gray-700 text-white">
      {restaurants.map((restaurant, index) => (
        <tr key={restaurant.id} className="hover:bg-gray-600 flex flex-col sm:table-row">
          <td className="border border-gray-300 px-2 py-1 flex-1">{index + 1}</td>
          <td className="border border-gray-300 px-2 py-1 flex-1">
            {isEditing === restaurant.id ? (
              <input
                type="text"
                value={editedRestaurant.RestaurantName}
                onChange={(e) =>
                  setEditedRestaurant({ ...editedRestaurant, RestaurantName: e.target.value })
                }
                className="border border-gray-300 p-1 rounded-md w-full bg-transparent text-white"
              />
            ) : (
              restaurant.RestaurantName
            )}
          </td>
          <td className="border border-gray-300 px-2 py-1 flex-1">
            {isEditing === restaurant.id ? (
              <input
                type="text"
                value={editedRestaurant.contactNumber}
                onChange={(e) =>
                  setEditedRestaurant({ ...editedRestaurant, contactNumber: e.target.value })
                }
                className="border border-gray-300 p-1 rounded-md w-full bg-transparent text-white"
              />
            ) : (
              restaurant.contactNumber
            )}
          </td>
          <td className="border border-gray-300 px-2 py-1 flex-1">
            {isEditing === restaurant.id ? (
              <input
                type="email"
                value={editedRestaurant.email}
                onChange={(e) =>
                  setEditedRestaurant({ ...editedRestaurant, email: e.target.value })
                }
                className="border border-gray-300 p-1 rounded-md w-full bg-transparent text-white"
              />
            ) : (
              restaurant.email
            )}
          </td>
          <td className="border border-gray-300 px-2 py-1 flex-1">
            {isEditing === restaurant.id ? (
              <textarea
                value={editedRestaurant.description}
                onChange={(e) =>
                  setEditedRestaurant({ ...editedRestaurant, description: e.target.value })
                }
                className="border border-gray-300 p-1 rounded-md w-full bg-transparent text-white"
              />
            ) : (
              restaurant.description
            )}
          </td>
          <td className="border border-gray-300 px-2 py-1 flex-1">
            {isEditing === restaurant.id ? (
              <input
                type="text"
                value={editedRestaurant.location}
                onChange={(e) =>
                  setEditedRestaurant({ ...editedRestaurant, location: e.target.value })
                }
                className="border border-gray-300 p-1 rounded-md w-full bg-transparent text-white"
              />
            ) : (
              restaurant.location
            )}
          </td>
          <td className="border border-gray-300 px-2 py-1 flex items-center justify-center gap-2">
            {isEditing === restaurant.id ? (
              <button
                onClick={() => handleSave(restaurant.id)}
                className="py-1 px-3 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(restaurant)}
                className="py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(restaurant.id)}
              className="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700"
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
