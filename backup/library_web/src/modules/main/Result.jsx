import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const { value } = location.state || {};
  const [data, setData] = useState([]);
  return (
    <div className="px-5 py-2 w-full h-full">
      {data.length > 0 ? (
        <div className="p-3 rounded-md bg-white grid grid-cols-4 gap-4"></div>
      ) : (
        <div className="flex items-center justify-center text-lg font-semibold">
          <p>Không tìm thấy kết quả</p>
        </div>
      )}
    </div>
  );
};

export default Result;
