const Loader = ({ size = "md", variant = "primary" }) => {
  const sizeStyles = {
    sm: "h-6 w-6 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  const variantStyles = {
    primary: "border-t-blue-500 border-r-blue-500 border-b-blue-500",
    success: "border-t-green-500 border-r-green-500 border-b-green-500",
    danger: "border-t-red-500 border-r-red-500 border-b-red-500",
    light: "border-t-gray-100 border-r-gray-100 border-b-gray-100",
    dark: "border-t-gray-800 border-r-gray-800 border-b-gray-800",
  };

  return (
    <div
      className={`animate-spin rounded-full rounded-full ... inline-block
          ${sizeStyles[size]} 
          ${variantStyles[variant]}
          border-opacity-30`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
// Usage examples:
// 1. Default loader
//<Loader />

// 2. Large red loader
//<Loader size="lg" variant="danger" />

// 3. Full page overlay loader
//<div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
//<Loader size="lg" variant="dark" />
//</div>
