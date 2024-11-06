import React, { useEffect, useState } from "react";
import { CButton, CForm, CFormInput, CFormSelect, CCol, CRow, CCard, CCardBody, CSpinner } from '@coreui/react';
import { message, Spin } from "antd"; // Keep Ant Design message for notifications
import { Link, useLocation, useNavigate } from "react-router-dom";
import { _createBook, _getBook, _getBookById, _getGenres, _getMajors } from "./apis";
import { Loading } from "../../components";


const EditBook = () => {
    const location = useLocation();
  const { state } = location || {};
  const { data } = state || {};
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [majors, setMajors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    majors: "",
  });
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  useEffect(() => {
    getBook(data.bookId);
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

  const getBook = async (id) => {
    const response = await _getBookById(id);
    console.log(response.data);
    setFormData({
        title: response.data.title,
        author: response.data.author,
        genre: response.data.genre,
        majors: response.data.majors,
    });
    setSelectedPdfFile(response.data.pdfLink);
    setExistingImageUrl(response.data.image);
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
    setFormData((prev) => ({ ...prev, genre: value }));
  };

  const handleMajorChange = (value) => {
    setFormData((prev) => ({ ...prev, majors: value }));
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

    setLoading(true); // Set loading state to true
    try {
      const response = await _createBook(data);
      console.log(response.message);
      console.log(response.data._id);
      if (response.message === "add_chapter") {
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
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
          <Loading/>
        )}
      <CCard className="max-w-3xl mx-auto p-6 mt-8">
        <CCardBody>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Chỉnh sửa thông tin sách</h2>
          <CForm onSubmit={handleSubmit} className="space-y-4">
            <CRow className="mb-3">
              <CCol>
                <label className="form-label">Tiêu đề sách</label>
                <CFormInput
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Nhập tiêu đề sách"
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <label className="form-label">Tác giả</label>
                <CFormInput
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Nhập tên tác giả"
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <label className="form-label">PDF File: (Nếu muốn thay đổi thì chọn lại)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFilePdfChange}
                  className="form-control"
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <label className="form-label">Thể loại</label>
                <CFormSelect
                  name="genre"
                  value={formData.genre}
                  onChange={(e) => handleGenreChange(e.target.value)}
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
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <label className="form-label">Chuyên ngành</label>
                <CFormSelect
                  name="majors"
                  value={formData.majors}
                  onChange={(e) => handleMajorChange(e.target.value)}
                >
                  <option value="" disabled>
                    Chọn chuyên ngành
                  </option>
                  {majors.map((major) => (
                    <option key={major._id} value={major._id}>
                      {major.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <label className="form-label">Ảnh bìa sách</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileImageChange}
                  className="form-control"
                />
              </CCol>
            </CRow>

            {selectedImageFile || existingImageUrl ? (
            <CRow className="mb-3">
              <CCol>
                <h3 className="text-sm font-medium text-gray-700">Ảnh bìa đã chọn:</h3>
                {selectedImageFile ? (
                  <img
                    src={URL.createObjectURL(selectedImageFile)}
                    alt="Selected Cover"
                    className="mt-2 h-24 object-cover border rounded-md"
                  />
                ) : (
                  <img
                    src={existingImageUrl}
                    alt="Existing Cover"
                    className="mt-2 h-24 object-cover border rounded-md"
                  />
                )}
              </CCol>
            </CRow>
          ) : null}

            <CRow className="mt-4">
              <CCol className="text-end">
                <CButton type="submit" color="success" disabled={loading}>
                  <span className="text-white">Lưu sách</span>
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

export default EditBook;
