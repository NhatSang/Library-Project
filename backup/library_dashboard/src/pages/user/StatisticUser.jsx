import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CRow } from "@coreui/react";
import { _getGenres } from "../home/apis";
import { useEffect, useState } from "react";
import { CChartBar, CChartPie } from "@coreui/react-chartjs";
import { Button, Space, Table, Tag } from "antd";
import { _getMajors, _getUsers } from "./apis";

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

      return (
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
          <CRow xs>
            <CCol xs="12" md="4">
            <CChartPie
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
          <CRow xs>
            <CCol xs="12" md="2" style={{marginLeft:'auto'}}>
                <Button type="primary">Xuất thống kê</Button>
                </CCol>
            </CRow>
        </CCol>
      );
      
    }
      

export default StatisticUser;