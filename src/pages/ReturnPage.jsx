import { useState } from "react";
import axios from "axios";

const Returns = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askReturnsAI = async () => {
    if (!question.trim()) return;
    try {
      const res = await axios.post("/api/ai-help", {
        question,
        contextType: "returns",
      });
      setAnswer(res.data.answer);
    } catch {
      setAnswer("Unable to fetch return info.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-green font-bold mb-4">Returns & Refunds</h1>
      <p className="mb-4">
        You can return most items within 30 days of delivery for a full refund.
      </p>
      <h2 className="font-semibold mb-2">How to Return</h2>
      <ol className="list-decimal pl-6 mb-6">
        <li>Log into your account.</li>
        <li>Go to “Orders”.</li>
        <li>Select the item & click “Request Return”.</li>
        <li>Print the return label & send it back.</li>
      </ol>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-2">Ask AI About Returns</h2>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your returns question..."
          className="border rounded p-2 w-full mb-2"
        />
        <button
          onClick={askReturnsAI}
          className="bg-green text-white px-4 py-2 rounded"
        >
          Ask AI
        </button>
        {answer && (
          <div className="mt-4 bg-gray-50 p-3 rounded border">
            <strong>Answer:</strong> {answer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Returns;