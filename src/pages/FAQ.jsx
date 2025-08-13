import { useState } from "react";
import axios from "axios";

const faqList = [
  { q: "How long does delivery take?", a: "3–5 business days." },
  { q: "Do you ship internationally?", a: "Yes, to over 50 countries." },
  {
    q: "What payment methods do you accept?",
    a: "Visa, Mastercard, PayPal, and Paystack.",
  },
];

const FAQ = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAskAI = async () => {
    if (!question.trim()) return;
    try {
      const res = await axios.post("/api/ai-help", {
        question,
        contextType: "faq",
      });
      setAnswer(res.data.answer);
    } catch {
      setAnswer("Sorry, could not fetch answer.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-green font-bold mb-4">Frequently Asked Questions</h1>

      <div className="mb-6">
        {faqList.map((item, idx) => (
          <details key={idx} className="mb-3 border p-3 rounded">
            <summary className="font-semibold cursor-pointer">{item.q}</summary>
            <p className="mt-2">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-2">Ask AI</h2>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          className="border rounded p-2 w-full mb-2"
        />
        <button
          onClick={handleAskAI}
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
};

export default FAQ;