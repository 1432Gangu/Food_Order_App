import React, { useEffect } from "react";
import { categories, mocData } from "../assets/mocData";
import New from "../assets/Images/New.webp";
import InfoSection from "../component/InfoSection";
import CategorySection from "../component/CategorySection";
import { setProducts } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProducteCurd from "../component/ProducteCurd";
import { Link } from "react-router-dom"; // Import Link for navigation
// import Shop from "./Shop";
import ProductList from "../Restaurants/ProductList";
import Shop from "./Shop";


function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(setProducts(mocData));
  }, [dispatch]);

  const restaurants = [
    { id: 1, name: "Restaurant 1" },
    { id: 2, name: "Restaurant 2" },
    { id: 3, name: "Restaurant 3" },
    { id: 4, name: "Restaurant 4" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
        <div className="container mx-auto py-4 flex flex-col md:flex-row space-x-0 md:space-x-4">
          {/* Categories Section */}
          <div className="w-full md:w-3/12 mb-6 md:mb-0">
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-bold px-2 py-2.5 rounded-t-md">
              SHOP BY CATEGORIES
            </div>
            <ul className="space-y-4 bg-white p-4 border rounded-b-md shadow">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-red-500 transition"
                >
                  <div className="w-2 h-2 border border-red-500 rounded-full mr-2"></div>
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero Image Section */}
          <div className="w-full md:w-9/12 h-96 relative rounded-md overflow-hidden shadow-lg">
            <img
              src={New}
              alt="Hero Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-16 left-8 space-y-4">
              <p className="text-4xl md:text-5xl font-bold text-white">
                FOOD ORDER APP
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-red-500">
                PLACE YOUR ORDER WHAT YOU WANT
              </h2>
              <p className="text-xl md:text-3xl font-bold text-gray-200">
                MILLION+ ITEMS
              </p>
              <button className="bg-gradient-to-r from-red-500 to-red-700 px-6 py-2 text-white mt-4 rounded-lg hover:shadow-lg transform transition-transform duration-300 hover:scale-105">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Restaurants Section */}
        <div className="mt-12 px-4 md:px-0">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Restaurants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
              >
                <Link
                  to={`/restaurant/${restaurant.id}`}
                  className="text-lg font-semibold text-red-500 hover:text-red-700"
                >
                  {restaurant.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <InfoSection />

        {/* Category Section */}
        <CategorySection />

        {/* Products Section */}
        <div className="container mx-auto py-12">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Top Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
            {products.products.slice(0, 5).map((product) => (
              <ProducteCurd key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Shop/>
      <ProductList />
    </div>
  );
}

export default Home;


// import React, { useEffect } from "react";
// import { categories } from "../assets/mocData";
// import New from "../assets/Images/New.webp";
// import InfoSection from "../component/InfoSection";
// import CategorySection from "../component/CategorySection";
// import { setProducts } from "../redux/productSlice";
// import { useDispatch, useSelector } from "react-redux";
// import ProducteCurd from "../component/ProducteCurd";
// import { Link } from "react-router-dom";
// import Shop from "./Shop";
// import axios from "axios";

// function Home() {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.product);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/v1/products/getAllProducts"
//         );
//         dispatch(setProducts(response.data.products || []));
//       } catch (error) {
//         console.error("Failed to fetch products:", error.message);
//       }
//     };

//     fetchProducts();
//   }, [dispatch]);

//   const restaurants = [
//     { id: 1, name: "Restaurant 1" },
//     { id: 2, name: "Restaurant 2" },
//     { id: 3, name: "Restaurant 3" },
//     { id: 4, name: "Restaurant 4" },
//   ];

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Hero Section */}
//       <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
//         <div className="container mx-auto py-4 flex flex-col md:flex-row space-x-0 md:space-x-4">
//           {/* Categories Section */}
//           <div className="w-full md:w-3/12 mb-6 md:mb-0">
//             <div className="bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-bold px-2 py-2.5 rounded-t-md">
//               SHOP BY CATEGORIES
//             </div>
//             <ul className="space-y-4 bg-white p-4 border rounded-b-md shadow">
//               {categories.map((category, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center text-sm font-medium text-gray-700 hover:text-red-500 transition"
//                 >
//                   <div className="w-2 h-2 border border-red-500 rounded-full mr-2"></div>
//                   {category}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Hero Image Section */}
//           <div className="w-full md:w-9/12 h-96 relative rounded-md overflow-hidden shadow-lg">
//             <img
//               src={New}
//               alt="Hero Image"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute top-16 left-8 space-y-4">
//               <p className="text-4xl md:text-5xl font-bold text-white">
//                 FOOD ORDER APP
//               </p>
//               <h2 className="text-2xl md:text-4xl font-bold text-red-500">
//                 PLACE YOUR ORDER WHAT YOU WANT
//               </h2>
//               <p className="text-xl md:text-3xl font-bold text-gray-200">
//                 MILLION+ ITEMS
//               </p>
//               <button className="bg-gradient-to-r from-red-500 to-red-700 px-6 py-2 text-white mt-4 rounded-lg hover:shadow-lg transform transition-transform duration-300 hover:scale-105">
//                 Shop Now
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Restaurants Section */}
//         <div className="mt-12 px-4 md:px-0">
//           <h2 className="text-3xl font-bold text-center text-gray-800">
//             Restaurants
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
//             {restaurants.map((restaurant) => (
//               <div
//                 key={restaurant.id}
//                 className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
//               >
//                 <Link
//                   to={`/restaurant/${restaurant.id}`}
//                   className="text-lg font-semibold text-red-500 hover:text-red-700"
//                 >
//                   {restaurant.name}
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Info Section */}
//         <InfoSection />

//         {/* Category Section */}
//         <CategorySection />

//         {/* Products Section */}
//         <div className="container mx-auto py-12">
//           <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//             Top Products
//           </h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
//             {products.products.slice(0, 5).map((product) => (
//               <ProducteCurd key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Footer Shop Section */}
//       <Shop />
//     </div>
//   );
// }

// export default Home;
