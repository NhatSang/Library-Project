import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function AddChapterScreen() {
  const location = useLocation();
  const { state } = location || {};
  const { data } = state || {};
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/get-chapters/${data._id}`
      );
      const json = await response.json();
      console.log(json.data);

      setChapters(json.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [formData, setFormData] = useState({
    bookId: data._id,
    bookLink: data.pdfLink,
    title: "",
    startPage: 0,
    endPage: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("bookId", formData.bookId);
    data.append("title", formData.title);
    data.append("startPage", formData.startPage);
    data.append("endPage", formData.endPage);
    data.append("bookLink", formData.bookLink);
     for (let [key, value] of data.entries()) {
       console.log(`${key}: ${value}`);
     }

    fetch("http://localhost:5000/api/v1/add-chapter", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((json) => {
        setChapters([...chapters, json.data]);
        setFormData({ ...formData, title: "", startPage: 0, endPage: 0 });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/delete-chapter/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedChapters = chapters.filter((c) => c._id !== id);
        setChapters(updatedChapters);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Start page</label>
            <input
              type="number"
              name="startPage"
              value={formData.startPage}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>End page</label>
            <input
              type="number"
              name="endPage"
              value={formData.endPage}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
      <div>
        {chapters.map((chapter) => (
          <div key={chapter._id}>
            <p>{chapter.title}</p>
            <button type="button" onClick={() => handleDelete(chapter._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
