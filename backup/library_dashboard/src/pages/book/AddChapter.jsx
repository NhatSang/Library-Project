import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, List, Typography, message, Spin } from "antd";
import "@react-pdf-viewer/core/lib/styles/index.css"; 
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { _createChapter, _createSummary, _getChapters } from "./apis";

const { Title, Text } = Typography;

export default function AddChapterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const { data } = state || {};
  const [chapters, setChapters] = useState([]);
  const [pdfFile, setPdfFile] = useState(data.pdfLink); 
  const [numPages, setNumPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    console.log(data);
      const response = await _getChapters(data.bookId);
      setChapters(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [formData, setFormData] = useState({
    bookId: data.bookId,
    bookLink: data.pdfLink,
    title: "",
    startPage: 0,
    endPage: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("bookId", formData.bookId);
    data.append("title", formData.title);
    data.append("startPage", formData.startPage);
    data.append("endPage", formData.endPage);
    data.append("bookLink", pdfFile);

    console.log(data);

    try {
     const response = await _createChapter(data);
      if (response.data) {
        setFormData({ ...formData, title: "", startPage: 0});
        fetchData();
        message.success("Thêm chương thành công!");
        setIsLoading(false);
      } else {
        message.error("Đã xảy ra lỗi khi thêm chương.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Đã xảy ra lỗi khi gửi yêu cầu.");
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/v1/delete-chapter/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setChapters(chapters.filter((c) => c._id !== id));
        message.success("Chương đã được xóa thành công!");
      }
    } catch (err) {
      console.log(err);
      message.error("Đã xảy ra lỗi khi xóa chương.");
    }
  };

  // Callback to handle page load for PDF
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const renderToolbar = (Toolbar) => ( 
    <Toolbar> 
      {(slots) => { 
        const { 
          CurrentPageInput, 
          EnterFullScreen, 
          GoToNextPage, 
          GoToPreviousPage, 
          NumberOfPages, 
          ShowSearchPopover, 
          Zoom, 
          ZoomIn, 
          ZoomOut, 
        } = slots; 
        return ( 
          <div 
            style={{ 
              alignItems: "center", 
              display: "flex", 
              width: "100%", 
            }} 
          > 
            <div style={{ padding: "0px 2px" }}> 
              <ShowSearchPopover /> 
            </div> 
            <div style={{ padding: "0px 2px" }}> 
              <ZoomOut /> 
            </div> 
            <div style={{ padding: "0px 2px" }}> 
              <Zoom /> 
            </div> 
            <div style={{ padding: "0px 2px" }}> 
              <ZoomIn /> 
            </div> 
            <div style={{ padding: "0px 2px", marginLeft: "auto" }}> 
              <GoToPreviousPage /> 
            </div> 
            <div style={{ padding: "0px 2px", display:'flex',flexDirection:'row' }}> 
              <CurrentPageInput />/ <NumberOfPages /> 
            </div> 
            <div style={{ padding: "0px 2px" }}> 
              <GoToNextPage /> 
            </div> 
            <div style={{ padding: "0px 2px", marginLeft: "auto" }}> 
              <EnterFullScreen /> 
            </div> 
          </div> 
        ); 
      }} 
    </Toolbar> 
  ); 
  const defaultLayoutPluginInstance = defaultLayoutPlugin({ 
    renderToolbar, 
    sidebarTabs: (defaultTabs) => [defaultTabs[0], defaultTabs[1]], 
  }); 
 
  const characterMap = { 
    isCompressed: true, 
    url: "https://unpkg.com/pdfjs-dist@3.4.120/cmaps/", 
  };

  const handleFinish = async ()=>{
    await _createSummary({bookId: data.bookId,title: data.title});
      navigate("/books");
      alert("Thêm sách thành công");
  }

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
    <div style={{ display: 'flex', padding: '20px' }}>
    {isLoading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}>
            <Spin size="large" tip="Đang tải..." />
          </div>
        )}
      {/* Bên trái: Xem PDF */}
      <div style={{ flex: 1 }}>
        <Title level={3}>Xem PDF</Title>
        <div style={{ border: '1px solid #ddd', padding: '10px', height: '600px', overflowY: 'auto' }}>
        <Viewer 
        fileUrl={pdfFile}
        plugins={[defaultLayoutPluginInstance]}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        characterMap={characterMap}
         />
        </div>
      </div>

      {/* Bên phải: Form nhập liệu */}
      <div style={{ flex: 1, paddingLeft: '20px' }}>
        <Title level={2}>Thêm Chương Mới</Title>
        <Form onSubmit={handleSubmit} layout="vertical">
          <Form.Item label="Tiêu đề chương" required>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Nhập tiêu đề chương"
              required
            />
          </Form.Item>
          <Form.Item label="Trang bắt đầu" required>
            <Input
              type="number"
              name="startPage"
              value={formData.startPage}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Trang kết thúc" required>
            <Input
              type="number"
              name="endPage"
              value={formData.endPage}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item>
            <div className="flex w-full justify-between">
            <Button onClick={()=>{
              handleSubmit();
            }} type="primary" htmlType="submit">
              Thêm Chương
            </Button>
            <Button onClick={()=>{
              handleFinish();
            }} type="primary">
              Hoàn thành
            </Button>
            </div>
          </Form.Item>
        </Form>
        <Title level={3}>Danh Sách Chương</Title>
        <List
          bordered
          dataSource={chapters}
          renderItem={(chapter) => (
            <List.Item
              actions={[
                <Button type="link" onClick={() => handleDelete(chapter._id)} danger>
                  Xóa
                </Button>,
              ]}
            >
              <Text strong>{chapter.title}</Text> - Trang {chapter.startPage} đến {chapter.endPage}
            </List.Item>
          )}
        />
      </div>
    </div>
    </Worker>
  );
}
