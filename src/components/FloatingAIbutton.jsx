// src/components/FloatingAIButton.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import AIAssistant from "./AIAssistant";

export default function FloatingAIButton({ product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((s) => !s)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        className="fixed right-6 bottom-6 z-50 bg-darkGreen text-white p-3 rounded-full shadow-lg flex items-center gap-2"
        title="Ask AI about this product"
      >
        <span className="text-2xl">🐔</span>
        <span className="hidden md:inline">Ask AI</span>
      </motion.button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-50 w-full md:w-1/2"
          >
            <AIAssistant product={product} onClose={() => setOpen(false)} />
          </motion.div>
        </div>
      )}
    </>
  );
}
