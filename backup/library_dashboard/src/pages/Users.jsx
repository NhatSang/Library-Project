import React, { useEffect, useState } from "react";
import Search from "../Components/Search";
import Pagination from "../Components/Pagination";
import TableUsers from "../Components/TableUsers";
import { useDispatch, useSelector } from "react-redux";
import { banUser, fetchUser } from "../redux/userSlice";
import axios from "axios";
const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.data);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  
  useEffect(() => {
    dispatch(fetchUser(page, 20, keyword));
  }, [page,keyword]);

  const handleToggleStatus = async (userId, currentStatus) => {
    await axios.post("http://localhost:3000/api/v1/ban-user", { userId });
    dispatch(banUser({ userId, currentStatus }));
  };

  const handleSearch = async (keyword) => {
    setKeyword(keyword);
  };
  return (
    <div className="m-2 space-y-2 flex flex-col items-center">
      <div className="w-full">
        <Search
          placeholder={"Search by name or code"}
          handleSearch={handleSearch}
        />
      </div>
      <div className="w-full">
        <TableUsers data={users.data} handleToggleStatus={handleToggleStatus} />
      </div>
      <Pagination pagination={users.pagination} setPage={setPage} />
    </div>
  );
};

export default Users;
