import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getProductSuggestion } from "../utils/gemini"; 
import FloatingAIButton from "../components/FloatingAIbutton";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState({});
 

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://project-1-b69v.onrender.com/api/products/category/${categoryName}`)
      .then(async (res) => {
        const fetchedProducts = res.data.data;
        setProducts(fetchedProducts);
        setIsLoading(false);

        // Fetch AI suggestions for each product
        const suggestions = {};
        for (const product of fetchedProducts) {
          suggestions[product._id] = "Loading AI suggestion...";
          const suggestionText = await getProductSuggestion(product.name);
          suggestions[product._id] = suggestionText;
        }
        setAiSuggestions(suggestions);
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setIsLoading(false);
      });
  }, [categoryName]);

  const skeletonArray = new Array(6).fill(0);

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen relative">
      <h2 className="text-3xl font-bold text-darkGreen mb-6 capitalize">{categoryName}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? skeletonArray.map((_, index) => (
              <div key={index} className="bg-white border border-gray-300 p-4 rounded-lg shadow-md animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded mb-4" />
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
                <div className="h-3 bg-gray-300 rounded w-1/3" />
              </div>
            ))
          : products.map((product) => (
              <div key={product._id} className="bg-white border border-green p-4 rounded-lg shadow-lg hover:bg-yellow transition-all">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4 border-2 border-orange" />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-lg mt-2">${product.price}</p>
                <Link to={`/product/${product.id}`} className="text-red-700 hover:text-orange mt-4 inline-block">
                  View Details
                </Link>

                {/* AI Suggestion */}
                <p className="mt-3 text-sm text-gray-600 italic">
                  🤖 {aiSuggestions[product._id] || "Loading..."}
                </p>
              </div>
            ))}
      </div>

      {/* Floating AI Chat Icon */}
      <FloatingAIButton product={products.length > 0 ? products[0] : null} />
    </div>
  );
};

export default CategoryProducts;
