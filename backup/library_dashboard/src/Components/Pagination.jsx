import React from "react";

const Pagination = ({ pagination, setPage }) => {
  const total = pagination?.total;
  const page = pagination?.page;
  const limit = pagination?.limit;
  const numPage = Math.ceil(total / limit);

  const handleNext = () => {
    if (page < numPage) {
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div className="flex">
      <button
      onClick={handlePrev}
        disabled={page == 1}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Previous
      </button>

      <button
      onClick={handleNext}
        disabled={page >= numPage}
        className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
