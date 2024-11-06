import React, { useEffect, useState } from "react";
import { _banUser, _getUsers } from "./apis";
import { Button, Col, ConfigProvider, Pagination, Space, Table } from 'antd';
import { CCol, CRow, useColorModes } from "@coreui/react";
import Search from "antd/es/transfer/search";
import { formatDate } from "../../utils";
import viVN from 'antd/lib/locale/vi_VN';




const Users = () => {
  const [users,setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
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
      render: (value) => formatDate(value),
    },
    {
      title:'Giới tính',
      dataIndex:'gender',
      key:'gender',
      render: (value) => value === 'Male' ? 'Nam' : 'Nữ',
    },
    {
      title:"Email",
      dataIndex:'email',
      key:'email',
    },
    {
      title:"Hành động",
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
    fetchUser(page, 5, keyword);
  }, [page,keyword]);

  const fetchUser = async (page, limit, keyword) => {
    setLoading(true);
    const response = await _getUsers(page, limit, keyword);
    if(!response.error){
      setUsers(response.data);
      console.log(response);
      setPagination(response.pagination);
      setLoading(false);
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

  const handlePageChange = (page) => {
    setPage(page);
  }

  const handleSearch = async (keyword) => {
    setKeyword(keyword);
  };


  return (
    <CRow>
      <CCol xs>
        <CCol style={{padding:20}}>
        <Search placeholder="Nhập từ khóa" onChange={(e) => handleSearch(e.target.value)} />
        </CCol>
        <Table title={()=>{
          return (
            <Col>
              <h3>Danh sách người dùng</h3>
            </Col>
          )
        }} 
        loading={loading} bordered  dataSource={users} columns={columns} pagination={false} />

        <CCol xs={12} md={12} style={{marginTop:20,marginBottom:10,justifyContent:'center',alignItems:'center'}}>
        <ConfigProvider locale={viVN}>  
        <Pagination showQuickJumper defaultCurrent={pagination.page} total={pagination.total} onChange={handlePageChange} />
        </ConfigProvider>
        </CCol>

      </CCol>
    </CRow>
  );
};

export default Users;
