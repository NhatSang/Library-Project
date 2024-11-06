import React, { useEffect, useState } from 'react'
import { Button, Col, ConfigProvider, Pagination, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { _getBook } from './apis';
import { CCol, CRow } from '@coreui/react';
import Search from 'antd/es/transfer/search';
import viVN from 'antd/lib/locale/vi_VN';
import { useSelector } from 'react-redux';


const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const theme = useSelector((state) => state.app.theme);
  const [themeTokens, setThemeTokens] = useState({
    colorBgContainer: '#ffffff',
    colorText: '#000000',
    colorBorder: '#d9d9d9'
  });


  useEffect(() => {
    setThemeTokens(theme ==='dark' ? {
      colorBgContainer: '#212631',
      colorText: '#E2E3E4',
      colorBorder: '#434343'
    } : {
      colorBgContainer: '#ffffff',
      colorText: '#000000',
      colorBorder: '#d9d9d9'
    });
  }, [theme]);

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
            navigate(`/books/edit`,{
              state: {
                data: {
                  bookId: record._id,
                }
              }
            })
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
    <ConfigProvider locale={viVN} theme={{token:themeTokens}}>
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
  </ConfigProvider>
  );
}

export default Books