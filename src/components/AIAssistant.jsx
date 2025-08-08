// src/components/AIAssistant.jsx
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AIAssistant = ({ product, initialQuestion = "", onClose }) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);

  const askAI = async (q) => {
    setLoading(true);
    setAnswer("");
    try {
      const res = await axios.post("/api/ai/ask", {
        question: q,
        productData: product,
      });
      const text = res.data.answer || "No answer.";
      setAnswer(text);
      setHistory((h) => [{ q, a: text }, ...h]);
    } catch (err) {
      console.error(err);
      setAnswer("Sorry — something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question) return;
    askAI(question);
  };

  const quickAsk = (q) => {
    setQuestion(q);
    askAI(q);
  };

  return (
    <div className="w-full max-w-2xl p-4 bg-white rounded shadow-lg text-black">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-green">
          Ask AI about this product
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mb-3">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. Is this suitable for broilers?"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-orange text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading || !question}
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>
          <button
            type="button"
            className="px-4 py-2 border rounded"
            onClick={() => {
              setQuestion("");
              setAnswer("");
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {/* example quick suggestions (client fallback) */}
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Is this product in stock?",
            "What's the delivery time?",
            "Is there a discount on bulk orders?",
          ].map((q) => (
            <button
              key={q}
              onClick={() => quickAsk(q)}
              className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t pt-3">
        {loading && <p className="text-sm text-gray-500">AI is typing…</p>}
        {!loading && answer && (
          <div className="bg-gray-50 p-3 rounded">
            <strong className="block text-sm text-green mb-1">AI:</strong>
            <p className="text-sm">{answer}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-3 text-sm">
            <h4 className="font-medium mb-1">Recent</h4>
            <ul className="space-y-2 max-h-40 overflow-auto">
              {history.map((h, i) => (
                <li key={i} className="p-2 bg-white border rounded">
                  <div className="text-xs text-gray-600">Q: {h.q}</div>
                  <div className="text-sm mt-1">A: {h.a}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
