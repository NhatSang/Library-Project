import React from 'react'
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import TableBook from '../../components/TableBook';

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