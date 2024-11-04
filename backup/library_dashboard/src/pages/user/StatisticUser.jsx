import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CRow } from "@coreui/react";
import { _getGenres } from "../home/apis";
import { useEffect, useRef, useState } from "react";
import { CChartBar, CChartPie } from "@coreui/react-chartjs";
import { Button, ConfigProvider, Space, Table, Tag } from "antd";
import { _getMajors, _getUsers } from "./apis";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {Roboto_Regular}  from "../../assets/fonts/Roboto_Regular";
import {Roboto_Bold} from "../../assets/fonts/Roboto_Bold";
import { formatDate } from "../../utils";
import { useSelector } from "react-redux";

const StatisticUser = () => {
    const today = new Date().toISOString().split("T")[0];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneWeekAgoFormatted = oneWeekAgo.toISOString().split("T")[0];
    const [startDate, setStartDate] = useState(oneWeekAgoFormatted);
    const [endDate, setEndDate] = useState(today);
    const [selectedMajors, setSelectedMajors] = useState("");
    const [genres, setGenres] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [majors, setMajors] = useState([]);
    const chartRef = useRef(null);
    const theme = useSelector((state) => state.app.theme);
    const [themeTokens, setThemeTokens] = useState({
      colorBgContainer: '#ffffff',
      colorText: '#000000',
      colorBorder: '#d9d9d9'
    });
  
  
    useEffect(() => {
      setThemeTokens(theme ==='dark' ? {
        colorBgContainer: '#212631',
        colorText: '#9ea15a',
        colorBorder: '#434343'
      } : {
        colorBgContainer: '#ffffff',
        colorText: '#000000',
        colorBorder: '#d9d9d9'
      });
    }, [theme]);

    useEffect(() => {
        fetchUsers();
        fetchMajors();
        }, []);



    const fetchMajors = async () => {
        try {
          const res = await _getMajors();
            setMajors(res.data);
        } catch (error) {
          console.log(error);
        }
      };
    const fetchUsers = async () => {
        try {
            const res = await _getUsers(1, 10, "");
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }

      const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        if (new Date(e.target.value) > new Date(endDate)) {
          setEndDate("");
        }
      };
    
      const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
      };
    
      const handleMajor = (e) => {
        console.log(e.target.value);
        setSelectedMajors(e.target.value);
        
      };

      const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'name',
            },
            {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            },
            {
            title: 'Chuyên ngành',
            },
            {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <Tag color={text === 'active' ? 'green' : 'red'}>{
                text === 'active' ? 'Hoạt động' : 'Bị khóa'
            }</Tag>,
            },
        ];

        const exportToPDF = () => {
            const doc = new jsPDF("p", "pt", "a4");
            const pageWidth = doc.internal.pageSize.getWidth(); 
        
            doc.addFileToVFS("Roboto-Regular.ttf", Roboto_Regular);
            doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
            doc.addFileToVFS("Roboto-Bold.ttf", Roboto_Bold);
            doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
            doc.setFont("Roboto");
        
            doc.setFontSize(12);
    
            const exporterName = "PHẠM ĐỨC NHÂN";
            const exportDate = `${new Date().toLocaleString("vi-VN")}`;

            doc.setFont("Roboto", "normal"); 
            doc.text("Người xuất: ", 40, 30); 
            doc.setFont("Roboto", "bold");
            doc.text(exporterName, 105, 30); 

            doc.setFont("Roboto", "normal"); 
            doc.text("Ngày xuất: ", 40, 50); 
            doc.setFont("Roboto", "bold");
            doc.text(exportDate, 105, 50); 
            

            doc.setFontSize(24);
            doc.setFont("Roboto", "bold");
            const exportTitle = "Thống kê người dùng";
            const textWidth = doc.getTextWidth(exportTitle);
            const xPosition = (pageWidth - textWidth) / 2;
            doc.text(exportTitle, xPosition, 100); 

            doc.setFontSize(14);
            doc.setFont("Roboto","normal");
            const exportDateRange = `Thống kê được lấy từ ${formatDate(startDate)} đến ${formatDate(endDate)}`;
            const exportMajor = `Chuyên ngành: ${majors.find((m) => m._id === selectedMajors)?.name || "Tất cả"}`;
            doc.text(exportDateRange, 40, 140);
            doc.text(exportMajor, 40, 160);

            if (chartRef.current) {
                const chart = chartRef.current;
                const chartImage = chart.toBase64Image();
                doc.addImage(chartImage, "PNG", xPosition - 40, 250, 300, 300)
                doc.setFontSize(12); 
                doc.setFont("Roboto", "bold");
                doc.text("Biểu đồ thống kê người dùng Nam và Nữ", xPosition, 230); 
            }
        
            doc.setFontSize(12);
            doc.text("Bảng danh sách người dùng", xPosition + 40, 610); 
            autoTable(doc, {
                startY: 630, 
                head: [["Tên người dùng", "Email", "Chuyên ngành", "Trạng thái"]],
                body: users.map((user) => [
                    user.name,
                    user.email,
                    majors.find((m) => m._id === user.major)?.name || "N/A",
                    user.status === "active" ? "Hoạt động" : "Bị khóa",
                ]),
                theme: 'grid', 
                styles: {
                    font: 'Roboto', 
                    fontSize: 12, 
                },
                headStyles: {
                    fillColor: [255, 0, 0], 
                    textColor: [255, 255, 255], 
                },
            });
        
            doc.save("UserStatistics.pdf");
        };
    

      return (
        <ConfigProvider theme={{ token: themeTokens }} >
        <CCol xs>
          <CRow className="d-flex justify-content-center align-items-center gap-4 ">
            
            <CCol xs="auto" className="d-flex align-items-center gap-2">
              <CFormLabel htmlFor="from-date" className="mb-0 text-base font-medium">Từ:</CFormLabel>
              <CFormInput
                type="date"
                id="from-date"
                max={today}
                value={startDate}
                onChange={handleStartDateChange}
                className="border rounded p-2"
              />
            </CCol>
      
            <CCol xs="auto" className="d-flex align-items-center gap-2">
              <CFormLabel htmlFor="to-date" className="mb-0 text-base font-medium">Đến:</CFormLabel>
              <CFormInput
                type="date"
                id="to-date"
                value={endDate}
                onChange={handleEndDateChange}
                min={startDate}
                className="border rounded p-2"
              />
            </CCol>
      
            <CCol xs="auto" className="d-flex align-items-center gap-2">
              <CFormLabel htmlFor="genre-select" className="mb-0 text-base font-medium">Chuyên ngành:</CFormLabel>
              <CFormSelect
                id="genre-select"
                className="w-40"
                onChange={handleMajor}
              >
                <option value="">------</option>
                {majors.map((major) => (
                  <option value={major._id} key={major._id}>
                    {major.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
      
            <CCol xs="auto">
              <CButton
                type="button"
                onClick={() => {}}
                color="success"
                className="px-4 py-2 text-dark font-medium rounded disabled-opacity-50"
                disabled={!startDate || !endDate}
              >
                <span className="text-base text-white">Xem thống kê</span>
              </CButton>
            </CCol>
          </CRow> 
          <div style={{height:20}} className="mt-4"/>
          <CRow>
            <CCol xs="12" md="4">
            <CChartPie
            ref={chartRef}
            data={{
                labels: ['Nam', 'Nữ'],
                datasets: [
                    {
                    label: 'Người dùng',
                    backgroundColor: ['#FF6384', '#36A2EB'],
                    data: [300, 100]
                    }
                ]
            }}
            />
            </CCol>
            <CCol xs="12" md="8">
                <Table columns={columns} dataSource={users} pagination={{pageSize:5}}/>
            </CCol>
          </CRow>
          <div style={{height:5}} className="mt-4"/>
          <CRow>
            <CCol xs="12" md="2" style={{marginLeft:'auto'}}>
                <Button onClick={exportToPDF} type="primary">Xuất thống kê</Button>
                </CCol>
            </CRow>
        </CCol>
        </ConfigProvider>
      );
      
    }
      

export default StatisticUser;