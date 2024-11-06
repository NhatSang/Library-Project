import React, { useEffect, useState } from "react";
import { _deleteNotification, _getNotifications, _sendNotification } from "./apis";
import { Button, Col, Space, Table, Tag } from 'antd';
import { useNavigate } from "react-router-dom";
import Search from "antd/es/transfer/search";
import { CCol } from "@coreui/react";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const renderStatus = (status) => {
    let statusText;
    let statusColor;

    switch (status) {
      case 'pending':
        statusText = 'Đang chờ';
        statusColor = 'orange';
        break;
      case 'sending':
        statusText = 'Đang gửi';
        statusColor = 'blue';
        break;
      case 'sended':
        statusText = 'Đã gửi';
        statusColor = 'green'; 
        break;
      default:
        statusText = 'Không xác định';
        statusColor = 'grey'; 
        break;
    }

    return (
      <Tag style={{ color: statusColor, fontWeight: 'bold' }}>
        {statusText}
      </Tag>
    );
  };

  const handleSendNotification = async (id) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn gửi thông báo này không?');
    if (confirmed) {
      const response = await _sendNotification(id);
      if (response.status === 200) {
        alert('Gửi thông báo thành công');
        getNotifications();
      } else {
        alert('Gửi thông báo thất bại');
      }
    } else {
      alert('Đã hủy gửi thông báo');
    }
  };
  
  const handleDeleteNotification = async (id) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa thông báo này không?');
    if (confirmed) {
      const response = await _deleteNotification(id);
      if (response.status === 200) {
        alert('Xóa thông báo thành công');
        getNotifications();
      } else {
        alert('Xóa thông báo thất bại');
      }
    } else {
      alert('Đã hủy xóa thông báo');
    }
  };


  const columns = [
    {
      key: "stt",
      title: "STT",
      dataIndex: "",
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title:'Nội dung',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title:'Điều kiện lọc',
      key: 'filterCondition',
      render: (value, item) => {
        console.log(item.filterCondition);
        let filterCondition = 'Tất cả';
    
        if (item.filterCondition.userId) {
          filterCondition = 'Theo User';
        } else if (item.filterCondition.major) {
          filterCondition = 'Theo ngành';
        }
    
        return (
          <div>
            <p>{filterCondition}</p>
          </div>
        );
      },
    },
    {
      title:'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value) => renderStatus(value),
    },
    {
      title: "Action",
      render: (value, item) => (
        <Space size="middle">
          <Button onClick={() => {
            navigate('/notification/edit-notification', { state: { notificationItem: item } });
          }} >Edit</Button>
          <Button onClick={()=>{
            handleDeleteNotification(item._id);
          }} type="primary" danger>Delete</Button>
          <Button onClick={()=>{
            handleSendNotification(item._id);
          }} type="primary">Send</Button>
        </Space>
      ),
    }
  ]

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    setLoading(true);
    try {
      const res = await _getNotifications();
      if(res.data){
        setNotifications(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }



    return (
      <div>
      <CCol style={{padding:20}}>
  <Search placeholder="Nhập từ khóa" onChange={(e) => handleSearch(e.target.value)} />
  </CCol>
      <Table 
      title={()=>{
    return (
      <Col>
        <h3>Danh sách thông báo</h3>
      </Col>
    )
  }}  dataSource={notifications} columns={columns} loading={loading} rowKey="id" pagination={{pageSize:3}}/>
  </div>
    )
};

export default Notifications;