import React, { useEffect, useState } from "react";
import { CButton, CForm, CFormInput, CFormSelect, CCol, CRow, CCard, CCardBody, CSpinner } from '@coreui/react';
import { message, Spin } from "antd"; // Keep Ant Design message for notifications
import { Link, useNavigate } from "react-router-dom";
import { _createBook, _getGenres, _getMajors } from "./apis";
import { Loading } from "../../components";


const AddBook = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [majors, setMajors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    majors: "",
    publisher: "",
    yob: "",
  });
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

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
    data.append("publisher", formData.publisher);
    data.append("yob", formData.yob);
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
          publisher: "",
          yob: "",
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
          <h2 className="text-2xl mb-4 text-primary">Thêm Sách Mới</h2>
          <CForm onSubmit={handleSubmit} className="space-y-4">
            <CRow className="mb-3">
              <CCol>
                <label className="form-label fw-bold">Tiêu tên sách</label>
                <CFormInput
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Nhập tên sách"
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <label className="form-label fw-bold">Tác giả</label>
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
                <label className="form-label fw-bold">Nhà xuất bản</label>
                <CFormInput
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleInputChange}
                  placeholder="Nhập tên nhà xuất bản"
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <label className="form-label fw-bold">Năm xuất bản</label>
                <CFormInput
                  type="number"
                  name="yob"
                  min="1900"
                  max="2099"
                  value={formData.yob}
                  onChange={handleInputChange}
                  placeholder="Nhập năm xuất bản"
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <label className="form-label fw-bold">PDF File:</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFilePdfChange}
                  required
                  className="form-control"
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <label className="form-label fw-bold">Thể loại</label>
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
                <label className="form-label fw-bold">Chuyên ngành</label>
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
                <label className="form-label fw-bold">Ảnh bìa sách</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileImageChange}
                  required
                  className="form-control"
                />
              </CCol>
            </CRow>

            {selectedImageFile && (
              <CRow className="mb-3">
                <CCol>
                  <h3 className="text-sm fw-bold">Ảnh bìa đã chọn:</h3>
                  <img
                    src={URL.createObjectURL(selectedImageFile)}
                    alt="Selected Cover"
                    className="mt-2 h-48 object-cover border rounded-md"
                  />
                </CCol>
              </CRow>
            )}

            <CRow className="mt-4">
              <CCol className="text-end">
                <CButton type="submit" color="success" disabled={loading}>
                  <span className="text-white">Thêm sách</span>
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

export default AddBook;
