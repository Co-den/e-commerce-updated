import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`https://project-1-b69v.onrender.com/api/products/category/${categoryName}`)
      .then(res => setProducts(res.data.data))
      .catch(err => console.error("Error fetching category products:", err));
  }, [categoryName]);

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-green mb-6">{categoryName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="bg-white border border-green p-4 rounded-lg shadow-lg hover:bg-yellow transition-all">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4 border-2 border-orange"
            />
            <h3 className="text-orange text-xl font-semibold">{product.name}</h3>
            <p className="text-yellow text-lg mt-2">${product.price}</p>
            <Link
              to={`/product/${product.id}`}
              className="text-green hover:text-orange mt-4 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
