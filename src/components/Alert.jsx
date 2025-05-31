import React, { useState, useEffect } from "react";

const Alert = ({ message, type = "success", onClose }) => {
  const [visible, setVisible] = useState(true);

  // Automatically close alert after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      closeAlert();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const closeAlert = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  // Define alert styles based on type
  const typeStyles = {
    success: "bg-green border-green-600 text-white",
    error: "bg-red border-red-400 text-red-700",
    warning: "bg-yellow border-yellow-400 text-yellow-700",
    info: "bg-blue border-blue-400 text-blue-700",
  };

  // Define icons for different alert types
  const icons = {
    success: (
      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-9.293a1 1 0 011.414 1.414L10 11.414l1.293-1.293a1 1 0 111.414 1.414L11.414 13l1.293 1.293a1 1 0 01-1.414 1.414L10 14.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 13 7.293 11.707a1 1 0 011.414-1.414L10 11.414l.586-.586z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.257 3.099c.763-1.36 2.683-1.36 3.446 0l6.518 11.634c.75 1.336-.213 2.967-1.723 2.967H3.462c-1.51 0-2.473-1.631-1.723-2.967L8.257 3.1zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-6a1 1 0 00-.993.883L9 8v3a1 1 0 001.993.117L11 11V8a1 1 0 00-1-1z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm9 1a1 1 0 10-2 0v3a1 1 0 102 0v-3zm-1-4a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
    ),
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div
        className={`${typeStyles[type]} px-4 py-3 rounded-lg border flex items-center shadow-lg`}
      >
        {icons[type]}
        <span className="text-sm flex-1">{message}</span>
        <button onClick={closeAlert} className="ml-3 text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;
