import React, { useEffect, useState } from "react";
import { _banUser, _getUsers } from "./apis";
import { Pagination, Search, TableUsers } from "../../components";
import { Button, Space, Table } from 'antd';



const Users = () => {
  const [users,setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const columns = [
    {
      key: "stt",
      title: "STT",
      dataIndex: "",
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title:'Mã sinh viên/giáo viên',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title:'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      title:'Giới tính',
      dataIndex:'gender',
      key:'gender',
    },
    {
      title:"Email",
      dataIndex:'email',
      key:'email',
    },
    {
      title:"Action",
      render: (value, item) => (
        <Space>
          {item.status === "active" ? (
            <Button onClick={()=>{handleToggleStatus(item._id,item.status)}} type="primary" danger>
              Khóa
            </Button>
          ) : (
            <Button onClick={()=>{handleToggleStatus(item._id,item.status)}} type="primary">
              Mở khóa
            </Button>
          )}
        </Space>
      ),

    }
  ]
  
  useEffect(() => {
    fetchUser(page, 10, keyword);
  }, [page,keyword]);

  const fetchUser = async (page, limit, keyword) => {
    const response = await _getUsers(page, limit, keyword);
    if(!response.error){
      setUsers(response.data);
      console.log(response.data[0]);
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
      <Table dataSource={users} columns={columns} pagination={false}  bordered/>
      </div>
      <Pagination pagination={pagination} setPage={setPage} />
    </div>
  );
};

export default Users;
