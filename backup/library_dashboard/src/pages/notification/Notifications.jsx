import React, { useEffect, useState } from "react";
import { Pagination, Search, TableUsers } from "../../components";

const Notifications = () => {
    return (
        <div className="m-2 space-y-2 flex flex-col items-center">
        <div className="w-full">
          <Search
            placeholder={"Search by name or code"}
            handleSearch={()=>{}}
          />
        </div>
        <div className="w-full">
          {/* <TableUsers data={users} handleToggleStatus={handleToggleStatus} /> */}
        </div>
      
      </div>
    )
};

export default Notifications;