import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Home2 from '../../assets/Images/Home2.webp'; // Ensure the path is correct

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Pre-fill data if passed via navigation state
    if (location.state) {
      setFormData({
        name: location.state.name || "",
        password: location.state.password || "",
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear errors for the current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Username is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (formData.name === "admin@gmail.com" && formData.password === "123456") {
        navigate("/ItemEdit"); // Navigate to admin dashboard
      } else {
        setErrors({ form: "Invalid username or password" });
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${Home2})` }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.form && (
            <p className="text-red-500 text-sm text-center">{errors.form}</p>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 px-8 py-2 text-white mt-4 hover:bg-blue-700 transform transition-transform duration-300 hover:scale-105 w-full"
          >
            Login
          </button>
        </form>

        {/* Link for navigating to Home page */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Not an admin?{" "}
            <Link to="/Home" className="text-blue-600 hover:underline">
              Go to Home Page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
