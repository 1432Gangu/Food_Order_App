// import React, { useEffect, useState } from 'react';

// const DeleteProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/v1/products/getAllProducts');
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const data = await response.json();
//       setProducts(data); // Assuming the response is an array of products
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/v1/products/deleteProduct/${id}`,
//         {
//           method: 'DELETE',
//         }
//       );
//       if (!response.ok) {
//         throw new Error('Failed to delete product');
//       }
//       alert('Product deleted successfully!');
//       setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleEdit = async (product) => {
//     const updatedName = prompt('Enter new product name:', product.name);
//     if (!updatedName) return;

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/v1/products/updateProduct/${product.id}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ ...product, name: updatedName }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error('Failed to update product');
//       }
//       alert('Product updated successfully!');
//       fetchProducts(); // Refresh the product list
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) {
//     return <p className="text-center text-lg text-gray-500">Loading products...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-lg text-red-500">Error: {error}</p>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Manage Products</h2>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
//               <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 px-4 py-2">{product.name}</td>
//                 <td className="border border-gray-300 px-4 py-2">${product.price}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   <button
//                     onClick={() => handleEdit(product)}
//                     className="mr-2 py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product.id)}
//                     className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DeleteProductList;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/products/getAllProducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data); // Assuming the response is an array of products
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/products/deleteProduct/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      alert('Product deleted successfully!');
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = async (product) => {
    const updatedName = prompt('Enter new product name:', product.name);
    if (!updatedName) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/products/updateProduct/${product.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...product, name: updatedName }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      alert('Product updated successfully!');
      fetchProducts(); // Refresh the product list
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoBack = () => {
    navigate('/AdminDashboard'); // Navigate to the Home page
  };

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Product Management</h2>
      <button
        onClick={handleGoBack}
        className="mb-6 py-2 px-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
      >
        Go back to Home page
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Item #</th> {/* Product number */}
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td> {/* Product number */}
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">₹{product.price}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(product)}
                    className="mr-2 py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="py-2 px-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
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

export default DeleteProductList;

