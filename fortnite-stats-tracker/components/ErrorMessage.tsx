
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="max-w-2xl mx-auto bg-red-500/30 border-2 border-red-500 text-red-200 px-6 py-4 rounded-lg text-center">
      <h3 className="font-bold text-2xl mb-1">Error</h3>
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default ErrorMessage;
