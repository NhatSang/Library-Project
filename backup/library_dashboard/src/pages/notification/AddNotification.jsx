import React, { useEffect, useState } from 'react';
import { _getUsers } from '../user/apis';
import { _getBook, _getMajors } from '../book/apis';
import { _createNotification, _updateNotification } from './apis';
import { useLocation } from 'react-router-dom';

const AddNotification = () => { 
    const location = useLocation(); 
  const notificationItem = location.state?.notificationItem;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [selectedData, setSelectedData] = useState([]);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isFilterConditionModalOpen, setIsFilterConditionModalOpen] = useState(false);
  const [isSecondaryModalOpen, setIsSecondaryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [secondarySelection, setSecondarySelection] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [users, setUsers] = useState([]);
  const [majors, setMajors] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // If notificationItem is provided, populate the form fields
    console.log(notificationItem);
    if (notificationItem) {
      setTitle(notificationItem.title);
      setContent(notificationItem.content);
      setFilterCondition(notificationItem.filterCondition.type);

      if (notificationItem.filterCondition.type === 'ALL') {
        setSecondarySelection([]);
      } else {
        setSecondarySelection(notificationItem.filterCondition.value || []);
      }
      
      setPreviewImage(notificationItem.image);
    }
  }, [notificationItem]);
  

  const fetchData = async () => {
    const resUser = await _getUsers();
    const resMajor = await _getMajors();
    const resBook = await _getBook();
    setUsers(resUser.data);
    setMajors(resMajor.data);
    setBooks(resBook.data.data);
  }

  const handleSelectData = (item) => {
    if (!selectedData.includes(item)) {
      setSelectedData([...selectedData, item]);
    }
  };

  const handleSelectFilterCondition = (condition) => {
    setFilterCondition(condition);
    setSecondarySelection([]);
    setIsSecondaryModalOpen(true);
  };

  const handleSelectSecondaryOption = (option) => {
    if (!secondarySelection.includes(option)) {
      setSecondarySelection([...secondarySelection, option]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveNotification = async() => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    let filterConditionObject;
    if (filterCondition === 'Theo User') {
        filterConditionObject = { 
          userId: secondarySelection.map((item) => item._id), 
          type: 'USER' 
        };
      } else if (filterCondition === 'Theo Ngành') {
        filterConditionObject = { 
          major: secondarySelection.map((item) => item._id), 
          type: 'MAJOR' 
        };
      } else if (filterCondition === 'Tất cả') {
        filterConditionObject = { 
          type: 'ALL' 
        };
      }
    formData.append('filterCondition', JSON.stringify(filterConditionObject));
    const selectedObject = JSON.stringify(selectedData.map((item) => item._id));
    formData.append('data', selectedObject);

    if (previewImage) {
      formData.append('image', {
        uri: previewImage,
        name: 'image.jpg', 
        type: 'image/jpeg',
      });
    }

    try {
      let response;
      if (notificationItem) {
        // If editing, call the update function
        response = await _updateNotification(notificationItem._id, formData);
      } else {
        // If adding, call the create function
        response = await _createNotification(formData);
      }

      if (response.status === 200) {
        alert(notificationItem ? 'Cập nhật thông báo thành công' : 'Thêm thông báo thành công');
        window.history.back();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">{notificationItem ? 'Cập Nhật Thông Báo' : 'Thêm Thông Báo'}</h1>

        {/* Form Inputs */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Tiêu đề</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="border border-gray-300 rounded-lg p-2 w-full" 
            placeholder="Nhập tiêu đề..." 
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Nội dung</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="border border-gray-300 rounded-lg p-2 w-full h-24" 
            placeholder="Nhập nội dung..."
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Tải lên hình ảnh</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="border border-gray-300 rounded-lg p-2 w-full" 
          />
          {previewImage && (
            <div className="mt-4">
              <p className="font-semibold">Xem trước hình ảnh:</p>
              <img src={previewImage} alt="Preview" className="w-32 h-auto mt-2 rounded-lg" />
            </div>
          )}
        </div>

        {/* Select Multiple Data (Sách) */}
        <div className="mb-4">
          <button 
            onClick={() => setIsDataModalOpen(true)} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Chọn Sách
          </button>
          {selectedData.length > 0 && (
            <div className="mt-2">
              <p>Sách đã chọn:</p>
              <ul>
                {selectedData.map((data, index) => (
                  <li key={index} className="text-sm">{data.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Select Filter Condition */}
        <div className="mb-4">
          <button 
            onClick={() => setIsFilterConditionModalOpen(true)} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Chọn Kiểu Lọc
          </button>
          {filterCondition && (
            <div className="mt-2">
              <p>Kiểu lọc đã chọn: {filterCondition}</p>
              <ul>
                {secondarySelection.map((item, index) => (
                  <li key={index} className="text-sm">{item.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className='w-full flex justify-between'>
          <button onClick={handleSaveNotification} className="bg-indigo-600 text-white px-6 py-2 rounded-lg mt-4">
            {notificationItem ? 'Cập Nhật Thông Báo' : 'Lưu Thông Báo'}
          </button>
          <button 
            onClick={() => window.history.back()}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg mt-4 ml-4">Quay lại</button>
        </div>

        {/* Data Modal */}
        
{/* {isDataModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <h2 className="text-xl font-bold mb-4">Chọn Sách</h2>
              <input
                type="text"
                placeholder="Tìm kiếm sách..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
              />
              <ul>
                {books
                  .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((book, index) => (
                    <li key={index} className="mb-2 cursor-pointer" onClick={() => handleSelectData(book)}>
                      {book.title}
                    </li>
                ))}
              </ul>
              <button onClick={() => setIsDataModalOpen(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Đóng</button>
            </div>
          </div>
        )}  */}

{isDataModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-auto">
      <h2 className="text-xl font-bold mb-4">Chọn Sách</h2>
      <input
        type="text"
        placeholder="Tìm kiếm sách..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
      />
      <ul className="max-h-[60vh] overflow-y-auto">
        {books
          .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((book, index) => (
            <li key={index} className="mb-2 cursor-pointer" onClick={() => handleSelectData(book)}>
              {book.title}
            </li>
          ))}
      </ul>
      <button onClick={() => setIsDataModalOpen(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Đóng</button>
    </div>
  </div>
)}

        {/* Filter Condition Modal */}
        {isFilterConditionModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <h2 className="text-xl font-bold mb-4">Chọn Kiểu Lọc</h2>
              <ul>
                {['Theo User', 'Theo Ngành','Tất cả'].map((condition, index) => (
                  <li key={index} className="mb-2 cursor-pointer" onClick={() => handleSelectFilterCondition(condition)}>
                    {condition}
                  </li>
                ))}
              </ul>
              <button onClick={() => setIsFilterConditionModalOpen(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Đóng</button>
            </div>
          </div>
        )}

        {/* Secondary Modal for selecting options based on filter condition */}
  {isSecondaryModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-auto">
      <h2 className="text-xl font-bold mb-4">{filterCondition} Options</h2>
      <ul className="max-h-[60vh] overflow-y-auto">
        {filterCondition === 'Tất cả' ? (
          <li className="mb-2">Chọn tất cả người dùng hoặc ngành</li>
        ) : filterCondition === 'Theo User' ? (
          users.map((user, index) => (
            <li key={index} className="mb-2 cursor-pointer" onClick={() => handleSelectSecondaryOption(user)}>
              {user.name}
            </li>
          ))
        ) : (
          majors.map((major, index) => (
            <li key={index} className="mb-2 cursor-pointer" onClick={() => handleSelectSecondaryOption(major)}>
              {major.name}
            </li>
          ))
        )}
      </ul>
      <button onClick={() => setIsSecondaryModalOpen(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Đóng</button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default AddNotification;
