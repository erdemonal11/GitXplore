import React from 'react';

const Loader: React.FC = () => (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-accent"></div>
  </div>
);

export default Loader;
