import React, { useEffect, useState } from "react";
import { TbUsersGroup, TbBooks } from "react-icons/tb";
import Chart from "../Components/Chart";
import axios from "axios";

const Home = () => {
  const [top10Views, setTop10Views] = useState([]);
  const [listGenres, setListGenres] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  // Tính ngày của tuần trước (7 ngày trước)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneWeekAgoFormatted = oneWeekAgo.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(oneWeekAgoFormatted);
  const [endDate, setEndDate] = useState(today);
  const [selectedGenre, setSelectedGenre] = useState("");
  useEffect(() => {
    fetchData(); // Gọi hàm fetchData
    fetchDataChart();
  }, []);
  const fetchData = async () => {
    try {
      const resListGenres = await axios.get(
        "http://localhost:3000/api/v1/get-genres"
      );
      setListGenres(resListGenres.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataChart = async () => {
    try {
      const resTopViews = await axios.get(
        `http://localhost:3000/api/v1/get-highest-views-books?startDate=${startDate}&endDate=${endDate}&genreId=${selectedGenre}`
      );
      setTop10Views(resTopViews.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (new Date(e.target.value) > new Date(endDate)) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleGenreChange = (e) => {
    console.log(e.target.value);

    setSelectedGenre(e.target.value);
  };
  return (
    <div className="m-2 space-y-2">
      <form className="bg-white p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex justify-center items-center space-x-2 ">
            <label className="text-base font-medium">From:</label>
            <input
              type="date"
              max={today}
              value={startDate}
              onChange={handleStartDateChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex justify-center items-center space-x-2">
            <label className=" text-base font-medium">To:</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate}
              className="border rounded p-2"
            />
          </div>
          <div className="flex justify-center items-center space-x-2 col-span-1">
            <label className=" text-base font-medium">Genre:</label>
            <select className="w-40" onChange={handleGenreChange}>
              <option value={""} className="text-center">
                ------
              </option>
              {listGenres.map((genre) => (
                <option value={genre._id} key={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => fetchDataChart()}
            className="px-4 py-2 bg-slate-400 text-slate-900 font-medium rounded disabled:opacity-50"
            disabled={!startDate || !endDate}
          >
            Confirm
          </button>
        </div>
      </form>
      <div className="space-y-2 mt-2">
        <div className="bg-white p-4 rounded-lg items-center flex space-x-2">
          <div className="w-10 h-10 rounded-full bg-cyan-500 items-center justify-center flex">
            {TbBooks({ size: 32, color: "white" })}
          </div>
          <div>
            <p className="text-sm text-slate-500">
              Total:{" "}
              <span className="font-medium text-black text-base">3.8K</span>
            </p>
            <p className="text-sm text-slate-500">
              New: <span className="font-medium text-black text-base">20</span>
            </p>
            <p className="text-sm text-slate-500">
              Total readers:{" "}
              <span className="font-medium text-black text-base">800</span>
            </p>
            <p className="text-sm text-slate-500">
              Total views:{" "}
              <span className="font-medium text-black text-base">87K</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg items-center flex space-x-2">
            <Chart
              dataList={top10Views}
              barColor={"rgb(137, 218, 235)"}
              direction={"y"}
              lable={"Views"}
              title={"Top 10 highest views books"}
            />
          </div>
          <div className="bg-white p-4 rounded-lg items-center flex space-x-2">
            <Chart
              dataList={top10Views}
              barColor={"rgb(240, 138, 95)"}
              direction={"y"}
              lable={"Ratings"}
              title={"Top 10 highest ratings books"}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg items-center flex space-x-2 h-28">
          <div className="w-10 h-10 rounded-full bg-orange-600 items-center justify-center flex">
            {TbUsersGroup({ size: 32, color: "white" })}
          </div>
          <div>
            <p className="text-sm text-slate-500">
              Total:{" "}
              <span className="font-medium text-black text-base">1.8K</span>
            </p>
            <p className="text-sm text-slate-500">
              New: <span className="font-medium text-black text-base">20</span>
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg items-center flex">
          <Chart
            dataList={top10Views}
            barColor={"rgb(186, 73, 30)"}
            direction={"x"}
            lable={"Users"}
            title={`New users from ${startDate} to ${endDate}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
