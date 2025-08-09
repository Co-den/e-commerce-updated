// src/components/ProductCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ product, onOpenChat }) => {
  // lightweight client-side suggestions first
  const generateQuickSuggestions = (p) => {
    const suggestions = [
      `Is ${p.name} available in bulk?`,
      `What is the delivery time for ${p.name}?`,
      `Is ${p.name} suitable for ${p.category || "all farms"}?`,
    ];
    return suggestions;
  };

  const [suggestions, setSuggestions] = useState(generateQuickSuggestions(product));
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const fetchAISuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const res = await axios.post("https://project-1-b69v.onrender.com/api/ai/suggestions", { product });
      if (res.data?.suggestions?.length) setSuggestions(res.data.suggestions);
    } catch (err) {
      console.error("AI suggestions error:", err);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  return (
    <div className="bg-white border border-green p-4 rounded-lg shadow-lg hover:bg-yellow transition-all">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4 border-2 border-orange"
      />
      <h3 className="text-orange text-xl font-semibold">{product.name}</h3>
      <p className="text-yellow text-lg mt-2">${product.price}</p>
      <Link to={`/product/${product._id || product.id}`} className="text-green hover:text-orange mt-4 inline-block">
        View Details
      </Link>

      {/* AI suggestions */}
      <div className="mt-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">Ask about this product</p>
          <button
            onClick={fetchAISuggestions}
            className="text-xs text-blue-600"
            disabled={loadingSuggestions}
          >
            {loadingSuggestions ? "Generating..." : "Improve suggestions"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onOpenChat(s)}
              className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;