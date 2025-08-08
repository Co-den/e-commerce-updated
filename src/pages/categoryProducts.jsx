import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getProductSuggestion } from "../utils/gemini"; 
import { FaRobot } from "react-icons/fa";
import FloatingAIButton from "../components/FloatingAIbutton";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState({});
  const [showChat, setShowChat] = useState(false);

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
      <h2 className="text-3xl font-bold text-green mb-6 capitalize">{categoryName}</h2>

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
                <h3 className="text-orange text-xl font-semibold">{product.name}</h3>
                <p className="text-yellow text-lg mt-2">${product.price}</p>
                <Link to={`/product/${product.id}`} className="text-green hover:text-orange mt-4 inline-block">
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

      {/* Floating Chat Window */}
      {showChat && (
        <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">AI Assistant</h3>
          <p className="text-sm text-gray-700">Ask me about any product!</p>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
