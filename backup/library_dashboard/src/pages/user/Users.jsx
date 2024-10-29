import React, { useEffect, useState } from "react";
import { _banUser, _getUsers } from "./apis";
import { Pagination, Search, TableUsers } from "../../components";
import { Table } from 'antd';



const Users = () => {
  const [users,setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const columns = [
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
    },
    {
      title:'Mã sinh viên/giáo viên',
      dataIndex: 'code',
    },
    {
      title:'Ngày sinh',
      dataIndex: 'dob',
    },
    {
      title:'Giới tính',
      dataIndex:'gender',
    },
    {
      title:"Email",
      dataIndex:'email',
    }
  ]
  
  useEffect(() => {
    fetchUser(page, 10, keyword);
  }, [page,keyword]);

  const fetchUser = async (page, limit, keyword) => {
    const response = await _getUsers(page, limit, keyword);
    if(!response.error){
      setUsers(response.data);
      setPagination(response.pagination);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    await _banUser(userId);
    setUsers(users.map((u) => {
      if (u._id === userId) {
        return { ...u, status: currentStatus === "active" ? "banned" : "active" };
      }
      return u;
    }));
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
        <TableUsers data={users} handleToggleStatus={handleToggleStatus} />
      </div>
      <Pagination pagination={pagination} setPage={setPage} />
    </div>
  );
};

export default Users;
