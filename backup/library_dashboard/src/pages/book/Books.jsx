import React, { useEffect, useState } from 'react'
import { Button, Col, ConfigProvider, Pagination, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { _getBook } from './apis';
import { CCol, CRow } from '@coreui/react';
import Search from 'antd/es/transfer/search';
import viVN from 'antd/lib/locale/vi_VN';


const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchData();
  }
  , [])

  const columns = [
    {
      title: 'Tên sách',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Thể loại',
      key: 'genre',
      render: (text, record) => (
        <span>
          {record.genre}
        </span>
      )
    },
    {
      title: 'Số trang',
      dataIndex: 'pageNumber',
      key: 'pageNumber',
    },
    {
      title: 'Ngày nhập',
      key: 'createdAt',
      render: (text, record) => (
        <span>
          {new Date(record.createdAt).toLocaleDateString()}
        </span>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button onClick={()=>{
            navigate(`/books/add-chapter`)
          }} type="primary">Sửa</Button>
          <Button type="danger">Xóa</Button>
        </div>
      ),
    }
  ]

  const handlePageChange = (page) => {
    fetchData(page);
  }

  const fetchData = async () => {
    try {
      const response = await _getBook()
      setBooks(response.data);
      setPagination(response.pagination);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <CRow>
    <CCol xs>
      <CCol style={{padding:20}}>
      <Search placeholder="Nhập từ khóa" onChange={(e) => handleSearch(e.target.value)} />
      </CCol>
      <Table title={()=>{
        return (
          <Col>
            <h3>Danh sách sách</h3>
          </Col>
        )
      }} 
      loading={loading} bordered  dataSource={books} columns={columns} pagination={false} />

      <CCol xs={12} md={12} style={{marginTop:20,marginBottom:10,justifyContent:'center',alignItems:'center'}}>
      {/* <ConfigProvider locale={viVN}>  
      <Pagination showQuickJumper defaultCurrent={pagination.page} total={pagination.total} onChange={handlePageChange} />
      </ConfigProvider> */}
      </CCol>

    </CCol>
  </CRow>
  );
}

export default Books