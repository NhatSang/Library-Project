import { Button, Input } from "antd";
import React from "react";
import { LuSearch } from "react-icons/lu";

const Search = ({ placeholder, handleSearch }) => {
  
  const handleChange = (event) => {
    handleSearch(event.target.value);
  };

  return (
    <form className="flex justify-between items-center max-w-sm mx-auto">
      <div/>
      <div className="relative w-full">
        <Input 
          onChange={handleChange} 
          size="large" 
          placeholder="Tìm kiếm ..." 
          prefix={<LuSearch size={24} />} 
        />
      </div>
    </form>
  );
};

export default Search;
