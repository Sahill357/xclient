// pages/404.tsx

import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="/244342-P3QSQK-285.jpg"  // Make sure the image path is correct and located in the public directory
        alt="Not Found"
        className="max-w-full h-auto mb-8"
      />
      <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
