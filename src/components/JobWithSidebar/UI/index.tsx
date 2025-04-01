export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-md rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Badge = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${className}`}
    >
      {children}
    </span>
  );
};

export const PaginationSkeleton = () => (
  <div className="flex justify-center mt-15">
    <div className="flex items-center space-x-2">
      <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
    </div>
  </div>
);
