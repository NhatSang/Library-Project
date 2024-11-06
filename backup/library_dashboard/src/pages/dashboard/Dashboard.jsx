import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import { _getUsers } from '../user/apis'
import { formatDate } from '../../utils'
import { CChartBar, CChartPie } from '@coreui/react-chartjs'

const Dashboard = () => {
  const [major, setMajor] = useState('Tất cả')
  const [users,setUsers] = useState([]);

  useEffect(() => {
    fetchUser(1, 5, '');
  }, []);

  const fetchUser = async (page, limit, keyword) => {
    const response = await _getUsers(page, limit, keyword);
    if(!response.error){
      setUsers(response.data);
      console.log(response.data[0]);
    }
  };


  const progressGroupExample2 = [
    { title: 'Nam', icon: cilUser, value: 53 },
    { title: 'Nữ', icon: cilUserFemale, value: 43 },
  ]

  const majors = [
    { name: 'Khoa học máy tính', value: 50 },
    { name: 'Kỹ thuật phần mềm', value: 22 },
    { name: 'Hệ thống thông tin', value: 74 },
    { name: 'Công nghệ thông tin', value: 98 },
    { name: 'An toàn thông tin', value: 22 },
    { name: 'Mạng máy tính', value: 43 },
    { name: 'Khoa học máy tính', value: 50 },
    { name: 'Kỹ thuật phần mềm', value: 22 },
    { name: 'Hệ thống thông tin', value: 74 },
    { name: 'Công nghệ thông tin', value: 98 },
    { name: 'An toàn thông tin', value: 22 },
    { name: 'Mạng máy tính', value: 43 },
    { name: 'Khoa học máy tính', value: 50 },
    { name: 'Kỹ thuật phần mềm', value: 22 },
    { name: 'Hệ thống thông tin', value: 74 },
    { name: 'Công nghệ thông tin', value: 98 },
    { name: 'An toàn thông tin', value: 22 },
    { name: 'Mạng máy tính', value: 43 },
  ]
  const getCurrentWeekDatesFromAnyDay = (date)=>{
    const currentDay = date.getDay();
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - currentDay + (currentDay === 0 ? -6 : 1)); // Đặt về ngày đầu tuần (Thứ Hai)
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(firstDayOfWeek);
        day.setDate(firstDayOfWeek.getDate() + i);
        weekDates.push(day.toLocaleDateString("vi-VN")); // Định dạng ngày theo chuẩn Việt Nam
    }
    return weekDates;
  }

  console.log(getCurrentWeekDatesFromAnyDay(new Date("2024-11-12")));

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className='font-weight-bold h4'>Tóm tắt thống kê theo tuần hiện tại</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">
                          Lượt đọc mới
                          </div>
                        <div className="fs-5 fw-semibold">100</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Lượt đánh giá mới
                        </div>
                        <div className="fs-5 fw-semibold">200</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                 <CChartBar
                 responsive
                 data ={
                  {
                    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
                    datasets: [
                      {
                        label: 'Lượt đọc',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56, 55, 40],
                      },
                      {
                        label: 'Lượt đánh giá',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        data: [28, 48, 40, 19, 86, 27, 90],
                      },
                    ],
                  }
                 }
                  options={{
                    tooltips: {
                      enabled: true,
                    },
                  }}
                />
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Người dùng mới</div>
                        <div className="fs-5 fw-semibold">100</div>
                      </div>
                    </CCol>

                    <CCol xs={6}>
                      <CDropdown>
                        <CDropdownToggle className='bg-primary' style={{justifyItems:'center',alignItems:'center',borderRadius:20}} caret={false}>
                          <p style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            margin: 5,
                            fontSize: 20,
                            fontWeight: 500,
                            color: "white",
                          }}>{major}</p>
                        </CDropdownToggle>
                        <CDropdownMenu  className="overflow-auto" style={{ maxHeight: "300px" }}>
                          {majors.map((major, index) => (
                            <CDropdownItem onClick={()=>{
                              setMajor(major.name)
                            }} key={index}>{major.name}</CDropdownItem>
                          ))}
                        </CDropdownMenu>
                      </CDropdown>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}
                  {/* <CChartPie
                  style={{height: "250px",margin: "auto"}}
                  responsive
                  data = {{
                    labels: ['Nam', 'Nữ'],
                    datasets: [
                      {
                        label: 'Số lượng',
                        backgroundColor: ['rgba(75, 192, 192, 0.2)','rgba(255, 206, 86, 0.2)'],
                        borderColor: ['rgba(75, 192, 192, 1)','rgba(255, 206, 86, 1)'],
                        borderWidth: 2,
                        data: [53, 43],
                      },
                    ],
                  }}
                  options={{
                    tooltips: {
                      enabled: true,
                    },
                  }}
                  /> */}
                </CCol>
              </CRow>

              <br />
              <div className="text-center">
                  <p className="font-weight-bold h4">Danh sách người dùng mới</p>
              </div>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Người dùng</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Giới tính
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Chuyên ngành
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Ngày sinh</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody className='overflow-auto' style={{ height: "300px" }}>
                  {users.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.image} status={"success"} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.name}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {
                          item.gender === 'Female' ? "Nữ":"Nam"
                        }
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {'Công nghệ thông tin'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {formatDate(item.dob)}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
