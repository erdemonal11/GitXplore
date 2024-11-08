import React from 'react';
import { FaClock } from 'react-icons/fa';

interface CommitInfoProps {
  commitMessage: string;
  commitDate: string;
}

const CommitInfo: React.FC<CommitInfoProps> = ({ commitMessage, commitDate }) => {
  const formattedDate = new Date(commitDate).toLocaleString();

  return (
    <div className="mt-4 flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
      <FaClock className="text-gray-500 dark:text-gray-400" />
      <span>{formattedDate}</span>
      <span className="font-semibold">|</span>
      <span className="truncate">{commitMessage}</span>
    </div>
  );
};

export default CommitInfo;
