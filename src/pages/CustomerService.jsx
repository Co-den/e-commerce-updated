import { useState } from "react";
import axios from "axios";

const CustomerService = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/ai-help", {
        question,
        contextType: "customer-service",
      });
      setAnswer(res.data.answer);
    } catch (error) {
      setAnswer("Sorry, something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-green font-bold mb-4">Customer Service</h1>
      <p className="mb-6">
        We’re here to help you with orders, payments, shipping, and more.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="font-semibold">Contact Us</h2>
        <ul className="list-disc pl-5">
          <li>Email: agrify@gmail.com</li>
          <li>Phone: +234 90 393 54723</li>
          <li>Live Chat: Available Mon–Fri, 9am–6pm</li>
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-green mb-2">Ask Our AI Assistant</h2>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="border rounded p-2 w-full mb-2"
        />
        <button
          onClick={handleAsk}
          className="bg-green text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
        {answer && (
          <div className="mt-4 bg-gray-50 p-3 rounded border">
            <strong>Answer:</strong> {answer}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerService;
