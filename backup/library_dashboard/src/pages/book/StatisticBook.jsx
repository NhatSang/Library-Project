import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CRow } from "@coreui/react";
import { _getGenres } from "./apis";
import { useEffect, useRef, useState } from "react";
import { CChartBar } from "@coreui/react-chartjs";
import { Button, Input } from "antd";
import {Roboto_Regular}  from "../../assets/fonts/Roboto_Regular";
import {Roboto_Bold} from "../../assets/fonts/Roboto_Bold";
import { formatDate } from "../../utils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


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
    const chartRef = useRef(null);
    const [thongKe, setThongKe] = useState(loaiThongKe[0]);

    

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
        console.log(e.target.value);
    }

    const handleChangeLoaiThongKe = (e) => {
        const value = e.target.value;
        const selected = loaiThongKe.find((a) => a.title === value);
        setThongKe(selected);
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
            title: "Bảy thói quen của người thành đạt",
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

    const books = [
        {
            title: "Nhà giả kim",
            author: "Paulo Coelho",
            genre: "Tiểu thuyết",
            pageNumber: 208,
            createdAt: "2021-01-15T00:00:00Z"
        },
        {
            title: "Sống như một người thông minh",
            author: "Dale Carnegie",
            genre: "Phát triển bản thân",
            pageNumber: 320,
            createdAt: "2021-02-10T00:00:00Z"
        },
        {
            title: "Thép đã tôi thế đấy",
            author: "A. Dostoevsky",
            genre: "Tiểu thuyết",
            pageNumber: 368,
            createdAt: "2021-03-05T00:00:00Z"
        },
        {
            title: "Trí tuệ xúc cảm",
            author: "Daniel Goleman",
            genre: "Phát triển bản thân",
            pageNumber: 400,
            createdAt: "2021-04-20T00:00:00Z"
        },
        {
            title: "Đắc Nhân Tâm",
            author: "Dale Carnegie",
            genre: "Phát triển bản thân",
            pageNumber: 280,
            createdAt: "2021-05-15T00:00:00Z"
        },
        {
            title: "Tôi tài giỏi, bạn cũng thế",
            author: "Adam Khoo",
            genre: "Phát triển bản thân",
            pageNumber: 300,
            createdAt: "2021-06-25T00:00:00Z"
        },
        {
            title: "Một phút cho nhau",
            author: "Spencer Johnson",
            genre: "Phát triển bản thân",
            pageNumber: 120,
            createdAt: "2021-07-10T00:00:00Z"
        },
        {
            title: "Bảy thói quen của người thành đạt",
            author: "Stephen R. Covey",
            genre: "Phát triển bản thân",
            pageNumber: 400,
            createdAt: "2021-08-18T00:00:00Z"
        },
        {
            title: "Cách tư duy",
            author: "Tony Buzan",
            genre: "Phát triển bản thân",
            pageNumber: 280,
            createdAt: "2021-09-05T00:00:00Z"
        },
        {
            title: "Giáo dục sớm",
            author: "Maria Montessori",
            genre: "Giáo dục",
            pageNumber: 250,
            createdAt: "2021-10-12T00:00:00Z"
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
        const exportTitle = "Thống kê Sách";
        const textWidth = doc.getTextWidth(exportTitle);
        const xPosition = (pageWidth - textWidth) / 2;
        doc.text(exportTitle, xPosition, 100); 

        doc.setFontSize(14);
        doc.setFont("Roboto","normal");
        const exportDateRange = `Thống kê được lấy từ ${formatDate(startDate)} đến ${formatDate(endDate)}`;
        const exportLoaiThongKe = `Loại thống kê: Top ${limit} ${thongKe.title} `;
        const exportGenre = `Thể loại: ${selectedGenre ? genres.find((genre) => genre._id === selectedGenre).name : "Tất cả"}`;
        doc.text(exportDateRange, 40, 140);
        doc.text(exportLoaiThongKe, 40, 160);
        doc.text(exportGenre, 40, 180);

        if (chartRef.current) {
            const chart = chartRef.current;
            const chartImage = chart.toBase64Image();
            const xPosition = (pageWidth - 500) / 2;
            doc.addImage(chartImage, "PNG", xPosition, 250, 500, 300)
            doc.setFontSize(12); 
            doc.setFont("Roboto", "bold");
            const exportNameChart = `Biểu đồ thống kê Top ${limit} ${thongKe.title}`;
            const textWidth = doc.getTextWidth(exportNameChart);
            const xPositionTitle = (pageWidth - textWidth) / 2;
            doc.text(exportNameChart, xPositionTitle, 230); 
        }

        doc.setFontSize(12);
        const exportNameTable = `Bảng Top ${limit} ${thongKe.title}`;
        const textWidthTable = doc.getTextWidth(exportNameTable);
        const xPositionTable = (pageWidth - textWidthTable) / 2;
            doc.text(exportNameTable, xPositionTable, 610); 
            autoTable(doc, {
                startY: 630, 
                head: [["Tên sách", "Tác giả", "Thể loại", "Số trang", "Ngày nhập"]],
                body: books.map((book) => [
                    book.title,
                    book.author,
                    book.genre,
                    book.pageNumber,
                    new Date(book.createdAt).toLocaleDateString(),
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

        doc.save("BookStatistics.pdf");

    }

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
                onChange={handleChangeLoaiThongKe}
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
            ref={chartRef}
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
            options={{
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true, 
                    },
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                            },
                        },
                    },
                },
            }}
            />
          </CCol>

          <div style={{height:30}}/>

            <CCol xs={12} md={2} style={{marginLeft:'auto'}}>
                <Button onClick={exportToPDF} type="primary" className="w-86">Xuất thống kê</Button>
            </CCol>

                <div style={{height:30}}/>
        </CCol>
    );
    }
export default StatisticBook;