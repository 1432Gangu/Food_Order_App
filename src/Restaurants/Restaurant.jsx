// import React from "react";
// import { Link } from "react-router-dom";

// const Restaurant = () => {
//   const restaurants = [
//     { id: 1, name: "Restaurant 1" },
//     { id: 2, name: "Restaurant 2" },
//     { id: 3, name: "Restaurant 3" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Restaurants</h1>
//       <ul className="space-y-4">
//         {restaurants.map((restaurant) => (
//           <li
//             key={restaurant.id}
//             className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
//           >
//             <Link
//               to={`/restaurant/${restaurant.id}`}
//               className="block p-6 text-xl font-medium text-blue-600 hover:text-blue-800"
//             >
//               {restaurant.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Restaurant;
