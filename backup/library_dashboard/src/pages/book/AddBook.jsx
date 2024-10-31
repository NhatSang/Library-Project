import React, { useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { _createBook, _getGenres, _getMajors } from "./apis";

const AddBook = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [majors, setMajors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "", // Chỉ lưu ID của genre
    majors: "", // Chỉ lưu ID của majors
  });
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  useEffect(() => {
    getGenres();
    getMajors();
  }, []);

  const getGenres = async () => {
    const response = await _getGenres();
    setGenres(response.data);
  };

  const getMajors = async () => {
    const response = await _getMajors();
    setMajors(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedPdfFile(file);
    } else {
      message.error("Bạn chỉ có thể tải lên file PDF!");
    }
  };

  const handleFileImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setSelectedImageFile(file);
    } else {
      message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
    }
  };

  const handleGenreChange = (value) => {
    setFormData((prev) => ({ ...prev, genre: value })); // Chỉ lưu ID genre
  };

  const handleMajorChange = (value) => {
    setFormData((prev) => ({ ...prev, majors: value })); // Chỉ lưu ID majors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPdfFile || !selectedImageFile) {
      message.error("Bạn cần tải lên cả file PDF và ảnh bìa!");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("genre", formData.genre);
    data.append("majors", formData.majors); 
    data.append("pdf", selectedPdfFile);
    data.append("image", selectedImageFile); 

    try {
      const response = await _createBook(data);
      console.log(response.message);
      console.log(response.data._id);
      if (response.message == "add_chapter") {
        navigate("/books/add-chapter", {
          state: {
            data: {
              bookId: response.data._id,
              title: response.data.title,
              startPage: response.data.startPage,
              pdfLink: response.data.pdfLink,
            },
          },
        });
      } else {
        message.success("Sách đã được thêm thành công!");
        setFormData({
          title: "",
          author: "",
          genre: "",
          majors: "",
        });
        setSelectedPdfFile(null);
        setSelectedImageFile(null);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/books" className="text-blue-500 hover:underline">
          Quay lại
        </Link>
        <h2 className="text-2xl font-semibold text-gray-700">Thêm Sách Mới</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tiêu đề sách</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Nhập tiêu đề sách"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tác giả</label>
          <Input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Nhập tên tác giả"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">PDF File:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFilePdfChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Thể loại</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="mt-1 w-full"
            required
          >
            <option value="" disabled>
              Chọn thể loại
            </option>
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Khoa</label>
          <select
            name="majors"
            value={formData.majors}
            onChange={(e) => handleMajorChange(e.target.value)}
            className="mt-1 w-full"
          >
            <option value="" disabled>
              Chọn khoa
            </option>
            {majors.map((major) => (
              <option key={major._id} value={major._id}>
                {major.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ảnh bìa sách</label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileImageChange}
            required
          />
        </div>

        {selectedImageFile && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Ảnh bìa đã chọn:</h3>
            <img
              src={URL.createObjectURL(selectedImageFile)}
              alt="Selected Cover"
              className="mt-2 h-48 object-cover border rounded-md"
            />
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
