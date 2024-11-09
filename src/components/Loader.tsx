import React from 'react';

interface LoaderProps {
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ size = 24 }) => (
  <div className="flex items-center justify-center">
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute top-0 left-0 w-full h-full">
        <div
          className="absolute top-0 left-0 bg-blue-500 rounded-full animate-ping"
          style={{ width: size / 3, height: size / 3 }}
        />
        <div
          className="absolute top-0 right-0 bg-purple-500 rounded-full animate-ping"
          style={{ width: size / 3, height: size / 3, animationDelay: '0.2s' }}
        />
        <div
          className="absolute bottom-0 left-0 bg-green-500 rounded-full animate-ping"
          style={{ width: size / 3, height: size / 3, animationDelay: '0.4s' }}
        />
        <div
          className="absolute bottom-0 right-0 bg-red-500 rounded-full animate-ping"
          style={{ width: size / 3, height: size / 3, animationDelay: '0.6s' }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
          style={{ width: size * 0.67, height: size * 0.67 }}
        />
      </div>
    </div>
  </div>
);

export default Loader;
