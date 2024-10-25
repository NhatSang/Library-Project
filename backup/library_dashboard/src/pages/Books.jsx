import React from 'react'
import Search from '../Components/Search';
import Pagination from '../Components/Pagination';
import TableBook from '../Components/TableBook';

const Books = () => {
  return (
    <div className="m-2 space-y-2 flex flex-col items-center">
      <div className="w-full">
        <Search />
      </div>
      <div className="w-full">
        <TableBook />
      </div>
      {/* <Pagination /> */}
    </div>
  );
}

export default Books