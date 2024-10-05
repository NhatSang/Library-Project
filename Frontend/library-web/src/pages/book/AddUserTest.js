import React, { useEffect, useState } from "react";

export default function AddUserTest() {
  const [majors, setMajors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "1",
    majors: "",
  });

  useEffect(() => {
    fetchMajors();
    const randomName = randomVietnameseName();
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: randomName,
    }));
  }, []);

  const fetchMajors = () => {
    fetch("http://localhost:5001/api/v1/get-all-majors")
      .then((response) => response.json())
      .then((data) => {
        setMajors(data.data); // Giả sử API trả về {data: [...]}
      })
      .catch((error) => {
        console.error("Error fetching genre:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/api/v1/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // window.alert("Thêm thành công");
          setFormData({
            name: "",
            email: "",
            password: "",
            majors: "",
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm tạo tên Việt Nam ngẫu nhiên
  const randomVietnameseName = () => {
    const firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Vũ", "Đặng", "Bùi", "Đỗ", "Võ"];
    const middleNames = ["Văn", "Thị", "Minh", "Hồng", "Phúc", "Hữu", "Quang", "Bích", "Anh", "Phương"];
    const lastNames = ["Hùng", "Hải", "Dung", "Lan", "Tùng", "Thanh", "Khánh", "Vinh", "Dũng", "Hạnh"];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomMiddleName = middleNames[Math.floor(Math.random() * middleNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName} ${randomMiddleName} ${randomLastName}`;
  };

  const styles = {
    formContainer: {
      maxWidth: "500px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f7f7f7",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      fontWeight: "bold",
      display: "block",
      marginBottom: "5px",
    },
    inputField: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginBottom: "10px",
    },
    submitButton: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      fontSize: "16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <form style={styles.formContainer} onSubmit={handleSubmit}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          style={styles.inputField}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          style={styles.inputField}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Majors:</label>
        <select
          name="majors"
          value={formData.majors}
          onChange={handleInputChange}
          required
          style={styles.inputField}
        >
          <option value="">Select majors</option>
          {majors.map((major) => (
            <option key={major._id} value={major._id}>
              {major.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" style={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}
