import React from "react";
const ErrorMessage = ({ message }) => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="p-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded shadow-md">
        <div className="flex items-center">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <strong className="font-medium">Error:</strong>
          <span className="ml-2">{message || "Something went wrong"}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
