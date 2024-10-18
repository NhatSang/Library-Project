import React from 'react'
import { Line,Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

// Đăng ký các thành phần cần thiết cho biểu đồ
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({dataList , direction,barColor, lable ,title}) => {
  
  const titles = dataList.map((item) => item.title);
  const totalViews = dataList.map((item) => item.totalViews);
  const data = {
    labels: titles,
    datasets: [
      {
        label: lable,
        data: totalViews,
        fill: false,
        backgroundColor: barColor,
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    indexAxis: direction,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        ticks: {
          display: false, // Ẩn nhãn trên trục y
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default Chart;