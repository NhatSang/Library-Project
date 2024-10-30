import React, { useEffect, useState } from 'react'
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import TableBook from '../../components/TableBook';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { _getBook } from './apis';


const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

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
          {record.genre?.name}
        </span>
      )
    },
    {
      title: 'Ngành',
      key: 'majors',
      render: (text, record) => (
        <span>
          {record.majors?.name}
        </span>
      )
    },
    {
      title: 'Số trang',
      dataIndex: 'pageNumber',
      key: 'pageNumber',
    },
    {
      title: 'Ngày tạo',
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
          <Button type="primary">Sửa</Button>
          <Button type="danger">Xóa</Button>
        </div>
      ),
    }
  ]

  const fetchData = async () => {
    try {
      const response = await _getBook()

      setBooks(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="m-2 space-y-2 flex flex-col items-center">
            <div className="w-full flex justify-end">
        <Button onClick={()=>{
          navigate('/books/add-book');
        }} type="primary">Thêm sách</Button>
      </div>
      <div className="w-full">
        <Search />
      </div>
      <div className="w-full">
        <Table dataSource={books} columns={columns} />
      </div>
      <Pagination />
    </div>
  );
}

export default Books