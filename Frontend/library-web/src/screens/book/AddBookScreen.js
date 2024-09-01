import React, { useState } from "react";

export default function AddBookScreen() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleFilePdfChange = (e) => {
    setSelectedPdfFile(e.target.files[0]);
  };
const handleFileImageChange = (e) => {
  setSelectedImageFile(e.target.files[0]);
};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPdfFile && selectedImageFile) {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("genre", formData.genre);
      data.append("pdf", selectedPdfFile);
      data.append("image", selectedImageFile);
      fetch("http://localhost:5000/api/v1/add-book", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Form submitted successfully:", data.message);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    } else {
      alert("Please select a PDF file to upload.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>genre:</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>PDF File:</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFilePdfChange}
          required
        />
      </div>
      <div>
        <label>Image File:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileImageChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
