import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CRow } from "@coreui/react";
import { _getGenres } from "./apis";
import { useEffect, useState } from "react";
import { CChartBar } from "@coreui/react-chartjs";
import { Button, Input } from "antd";

const StatisticBook = () => {
    const today = new Date().toISOString().split("T")[0];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneWeekAgoFormatted = oneWeekAgo.toISOString().split("T")[0];
    const [startDate, setStartDate] = useState(oneWeekAgoFormatted);
    const [endDate, setEndDate] = useState(today);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);

    const loaiThongKe = [
        {
            id: 1,
            type:"VIEW",
            title:"Sách có lượt xem nhiều nhất"
        },
        {
            id: 2,
            type:"RATE",
            title:"Sách có lượt đánh giá cao nhất"
        }
    ]

    useEffect(() => {
        getGenres();
    }, []);

    const getGenres = async () => {
        try {
            const res = await _getGenres();
            setGenres(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        if (new Date(e.target.value) > new Date(endDate)) {
            setEndDate("");
        }
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    }

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    }

    const handleChange = (e) => {
        const value = e.target.value; 
        const numericValue = Number(value);
        if (value === '') {
            setLimit(''); 
        } else if (!isNaN(numericValue)) {
            if (numericValue < 1) {
                setLimit(1);
            } else if (numericValue > 20) {
                setLimit(20);
            } else {
                setLimit(numericValue); 
            }
        }
    };


    const dataFake = [
        {
            _id: "1",
            title: "Sách 1",
            total: 10,
        },
        {
            _id: "2",
            title: "Sách 2",
            total: 20,
        },
        {
            _id: "3",
            title: "Sách 3",
            total: 30,
        },
        {
            _id: "4",
            title: "Sách 4",
            total: 40,
        },
        {
            _id: "5",
            title: "Sách 5",
            total: 50,
        },
        {
            _id: "6",
            title: "Sách 6",
            total: 60,
        },
        {
            _id: "7",
            title: "Sách 7",
            total: 70,
        },
        {
            _id: "8",
            title: "Sách 8",
            total: 80,
        },
        {
            _id: "9",
            title: "Sách 9",
            total: 90,
        },
        {
            _id: "10",
            title: "Sách 10",
            total: 100,
        }
    ]

    return (
        <CCol>
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
              <CFormLabel htmlFor="genre-select" className="mb-0 text-base font-medium">Thể loại:</CFormLabel>
              <CFormSelect
                id="genre-select"
                className="w-40"
                onChange={handleGenreChange}
              >
                <option value="">------</option>
                {genres.map((genre) => (
                  <option value={genre._id} key={genre._id}>
                    {genre.name}
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
          <CCol>
        
        <div style={{height:30}}/>

          <CCol xs="auto" className="d-flex align-items-center gap-2">
              <CCol md={2}>
                <CFormLabel htmlFor="genre-select" className="mb-0 text-base font-medium">Loại thống kê:</CFormLabel>
              </CCol>
              <CCol md={6}>
                <CFormSelect
                id="genre-select"
                className="w-10"
                onChange={handleGenreChange}
                >
                <option value="">------</option>
                {loaiThongKe.map((a) => (
                  <option value={a._id} key={a._id}>
                    {a.title}
                  </option>
                ))}
              </CFormSelect>
              </CCol>
              <div style={{width:30}}/>
              <CFormLabel  className="mb-0 text-base font-medium">Số lượng sách:</CFormLabel>
              <CCol md={1}>
                <Input 
                value={limit}
                onChange={(e) => handleChange(e)}
                type="number"
                min={1}
                max={20}
                 placeholder="Nhập số lượng sách" />
                </CCol>
            </CCol>
          </CCol>

          <div style={{height:30}}/>

          <CCol xs={12} md={10} style={{margin:'auto'}}>
            <CChartBar
            lang="vi"
            data={{
                labels: dataFake.map((item) => item.title),
                datasets: [
                    {
                    label: "Số lượng sách",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: dataFake.map((item) => item.total),
                    },
                ],
            }}
            />
          </CCol>

          <div style={{height:30}}/>

            <CCol xs={12} md={2} style={{marginLeft:'auto'}}>
                <Button type="primary" className="w-86">Xuất thống kê</Button>
            </CCol>

                <div style={{height:30}}/>
        </CCol>
    );
    }
export default StatisticBook;