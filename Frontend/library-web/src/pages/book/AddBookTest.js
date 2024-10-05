import React, { useEffect, useState } from "react";

export default function AddBookTest() {
  const [genre, setGenre] = useState([]);
  const [mayor, setMayor] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    mayor: "",
    summary: "",
  });

  useEffect(() => {
    fetchGenre();
    fetchMayor();
  }, []);

  const fetchMayor = () => {
    fetch("http://localhost:5001/api/v1/get-all-majors")
      .then((response) => response.json())
      .then((data) => {
        setMayor(data.data); // Giả sử API trả về {data: [...]} 
      })
      .catch((error) => {
        console.error("Error fetching mayor:", error); // Sửa log cho đúng
      });
  };

  const fetchGenre = () => {
    fetch("http://localhost:5001/api/v1/get-genre")
      .then((response) => response.json())
      .then((data) => {
        setGenre(data.data); // Giả sử API trả về {data: [...]} 
      })
      .catch((error) => {
        console.error("Error fetching genre:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/api/v1/add-book-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Success") {
          // Reset đầy đủ form
          setFormData({
            title: "",
            author: "",
            genre: "",
            mayor: "",
            summary: "",
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };
  const addBook = (book) => {
    fetch("http://localhost:5001/api/v1/add-book-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Success") {
          console.log(`Đã thêm sách: ${book.title}`);
        }
      })
      .catch((error) => {
        console.error("Error submitting book:", error);
      });
  };

  

  const styles = {
    formContainer: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '5px',
    },
    inputField: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '10px',
    },
    submitButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <>
    <form style={styles.formContainer} onSubmit={handleSubmit}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          style={styles.inputField}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          required
          style={styles.inputField}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Summary:</label>
        <input
          type="text"
          name="summary"
          value={formData.summary}
          onChange={handleInputChange}
          required
          style={styles.inputField}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Genre:</label>
        <select
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          required
          style={styles.inputField}
        >
          <option value="">--Select Genre--</option>
          {genre.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name} + {g._id}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Mayor:</label> {/* Sửa label */}
        <select
          name="mayor"
          value={formData.mayor}
          onChange={handleInputChange}
          required
          style={styles.inputField}
        >
          <option value="">--Select Mayor--</option>
          {mayor.map((m) => (
            <><option key={m._id} value={m._id}>
              {m.name} + {m._id}

            </option><p>{m.name} + {m._id}</p></>
          ))}
        </select>
      </div>
      <button type="submit" style={styles.submitButton}>
        Submit
      </button>
    </form>
    <div>
      <h1>Thêm sách</h1>
      <button onClick={()=>{
        books.forEach((book) => {
          addBook(book);
        });
      }}>Thêm sách</button>
    </div>
    </>
  );
}
// const books = [
//   {
//     title: "Lập Trình C++ Từ Cơ Bản Đến Nâng Cao",
//     author: "Nguyễn Minh Đức",
    // genre: '66ef98096316ce75499684d7',
    // mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách này giới thiệu một cách toàn diện về ngôn ngữ lập trình C++, từ các kiến thức cơ bản như biến, hàm, và cấu trúc điều kiện đến các khái niệm nâng cao như lập trình đối tượng, con trỏ, và đa hình. Qua nhiều ví dụ thực tế, người đọc sẽ dần hiểu rõ cách thức phát triển các ứng dụng lớn và tối ưu hóa mã nguồn.",
//   },
//   {
//     title: "Học SQL Server 2016 Qua Các Ví Dụ",
//     author: "Trần Quang Nhựt",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Đây là một hướng dẫn chi tiết về SQL Server 2016, giúp người học tiếp cận từ những lệnh cơ bản đến các kỹ thuật nâng cao trong quản lý cơ sở dữ liệu. Cuốn sách bao gồm nhiều bài tập thực hành thực tế, từ thiết lập cơ sở dữ liệu đến các truy vấn phức tạp, phục vụ tốt cho người mới bắt đầu và những ai muốn củng cố kiến thức về SQL.",
//   },
//   {
//     title: "Python Cho Người Mới Bắt Đầu",
//     author: "Phạm Quang Hưng",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách này được thiết kế cho người mới bắt đầu học Python. Nó cung cấp một cái nhìn tổng quan về cấu trúc ngôn ngữ, cú pháp và các thư viện quan trọng của Python. Các bài tập thực hành đơn giản nhưng hiệu quả giúp người học nắm vững kiến thức và phát triển các dự án nhỏ như quản lý dữ liệu và xử lý văn bản.",
//   },
//   {
//     title: "Phân Tích Dữ Liệu Với Python",
//     author: "Đặng Văn Hùng",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách này giúp bạn tiếp cận lĩnh vực phân tích dữ liệu bằng ngôn ngữ Python, sử dụng các thư viện mạnh mẽ như Pandas, NumPy, và Matplotlib. Các ví dụ và bài tập thực hành trong sách giúp người đọc hiểu rõ cách thao tác dữ liệu, xử lý tập dữ liệu lớn, và xây dựng các biểu đồ trực quan.",
//   },
//   {
//     title: "Cẩm Nang Bảo Mật Mạng",
//     author: "Nguyễn Văn Hòa",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách này cung cấp những nguyên lý cơ bản và các biện pháp tiên tiến để bảo mật mạng. Nội dung tập trung vào việc nhận diện các mối đe dọa, bảo vệ thông tin nhạy cảm, và xây dựng một hệ thống phòng thủ toàn diện trước các cuộc tấn công mạng, giúp người đọc có cái nhìn sâu sắc về lĩnh vực an ninh mạng.",
//   },
//   {
//     title: "JavaScript - Học Từ Cơ Bản Đến Nâng Cao",
//     author: "Lê Trung Tín",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Đây là cuốn sách dành cho những ai muốn học lập trình JavaScript từ đầu và tiến lên cấp độ nâng cao. Sách bao gồm các chủ đề từ cú pháp cơ bản đến các khái niệm nâng cao như lập trình bất đồng bộ, xử lý sự kiện, và phát triển các ứng dụng web hiện đại với JavaScript, giúp người học nắm vững kiến thức để trở thành lập trình viên front-end chuyên nghiệp.",
//   },
//   {
//     title: "AI - Trí Tuệ Nhân Tạo Từ Cơ Bản Đến Nâng Cao",
//     author: "Ngô Thanh Bình",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách này là một nguồn tài liệu quan trọng về trí tuệ nhân tạo (AI), bao gồm các khái niệm cơ bản như học máy, mạng nơ-ron, và học sâu. Người đọc sẽ tìm hiểu cách xây dựng các mô hình AI đơn giản và ứng dụng chúng vào các lĩnh vực khác nhau như xử lý ngôn ngữ tự nhiên và nhận diện hình ảnh, từ đó tạo nền tảng cho sự nghiệp trong ngành công nghệ AI.",
//   },
//   {
//     title: "Cấu Trúc Dữ Liệu Và Giải Thuật",
//     author: "Nguyễn Mạnh Hùng",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Đây là cuốn sách nền tảng dành cho sinh viên và các lập trình viên về cấu trúc dữ liệu và giải thuật. Nội dung của sách bao quát các khái niệm như danh sách liên kết, cây, đồ thị, cùng với các giải thuật sắp xếp và tìm kiếm. Sách không chỉ cung cấp lý thuyết mà còn có nhiều ví dụ minh họa cụ thể, giúp người đọc hiểu sâu hơn về cách tối ưu hóa mã nguồn.",
//   },
//   {
//     title: "Phân Tích Thiết Kế Hệ Thống Thông Tin",
//     author: "Phạm Minh Quang",
//     genre: '66ef98096316ce75499684d7',
//   mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách này hướng dẫn chi tiết cách phân tích và thiết kế các hệ thống thông tin quản lý, từ việc thu thập yêu cầu, xây dựng mô hình dữ liệu, đến việc triển khai hệ thống. Với nhiều ví dụ thực tế, sách giúp người đọc hiểu được quy trình phát triển một hệ thống phần mềm quản lý hiệu quả và khoa học.",
//   },
//   {
//     title: "Cơ Sở Dữ Liệu Quan Hệ Với MySQL",
//     author: "Nguyễn Quốc Hùng",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách này giới thiệu về cơ sở dữ liệu quan hệ với các khái niệm như bảng, khóa chính, và các truy vấn SQL. MySQL được sử dụng làm công cụ chính để giúp người đọc làm quen với việc tạo và quản lý cơ sở dữ liệu. Cuốn sách cũng chứa nhiều ví dụ thực tế và bài tập giúp người học ứng dụng kiến thức vào thực tế.",
//   },
// ];

// const books = [
//   {
//     title: "React Native - Lập Trình Di Động Từ A Đến Z",
//     author: "Phạm Tuấn Anh",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách này giúp người đọc hiểu rõ về cách sử dụng React Native để phát triển ứng dụng di động đa nền tảng."
//   },
//   {
//     title: "Blockchain Và Ứng Dụng Trong Thực Tế",
//     author: "Nguyễn Thị Thúy Hằng",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách này cung cấp cái nhìn sâu sắc về công nghệ blockchain và cách nó thay đổi các lĩnh vực từ tài chính đến chuỗi cung ứng."
//   },
//   {
//     title: "Lập Trình Web Với Node.js",
//     author: "Hoàng Minh Đức",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Hướng dẫn về Node.js, nền tảng mạnh mẽ để phát triển ứng dụng web với JavaScript phía server."
//   },
//   {
//     title: "Phát Triển Game Với Unity",
//     author: "Trần Hữu Phước",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Hướng dẫn phát triển game sử dụng Unity, từ tạo đối tượng 3D đến quản lý âm thanh và đồ họa."
//   },
//   {
//     title: "Xử Lý Ảnh Với OpenCV",
//     author: "Đỗ Trung Kiên",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Giới thiệu về thư viện OpenCV và các kỹ thuật xử lý ảnh và video từ cơ bản đến nâng cao."
//   },
//   {
//     title: "Khoa Học Dữ Liệu Với R",
//     author: "Nguyễn Văn Khánh",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách giới thiệu ngôn ngữ R cho phân tích dữ liệu, từ xử lý dữ liệu đến xây dựng mô hình dự đoán."
//   },
//   {
//     title: "An Ninh Mạng Và Tấn Công Mạng",
//     author: "Lê Văn Hùng",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cung cấp các kỹ thuật bảo mật mạng và cách thiết lập các biện pháp phòng thủ khỏi các mối đe dọa mạng."
//   },
//   {
//     title: "Big Data - Khai Thác Dữ Liệu Lớn",
//     author: "Vũ Quang Trung",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách giúp hiểu về cách khai thác và phân tích dữ liệu lớn sử dụng các công cụ như Hadoop và Spark."
//   },
//   {
//     title: "Deep Learning Cơ Bản Và Ứng Dụng",
//     author: "Lý Quang Vinh",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách giúp khám phá học sâu từ các khái niệm cơ bản đến ứng dụng thực tế sử dụng TensorFlow và Keras."
//   },
//   {
//     title: "Thiết Kế Web Với HTML, CSS Và JavaScript",
//     author: "Đinh Thanh Tùng",
//     genre: '66ef98096316ce75499684d7',
//     mayor: '66c0ba4b73447b36abb7c636',
//     summary: "Cuốn sách cơ bản về cách thiết kế trang web sử dụng HTML, CSS và JavaScript để phát triển các trang web chuyên nghiệp."
//   }
// ];
// const books = [
//   {
//     title: "Cơ Học Kỹ Thuật Ứng Dụng",
//     author: "Phạm Văn Hải",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách cung cấp các khái niệm cơ bản và ứng dụng của cơ học kỹ thuật trong các hệ thống cơ khí, từ lý thuyết tĩnh học, động học đến các nguyên lý cơ bản về lực và mô-men."
//   },
//   {
//     title: "Nguyên Lý Máy Và Thiết Kế Máy",
//     author: "Nguyễn Văn Minh",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Sách tập trung vào các nguyên lý hoạt động của các bộ phận cơ khí và quy trình thiết kế máy móc, từ việc tính toán chi tiết đến việc áp dụng các nguyên lý cơ bản trong chế tạo máy."
//   },
//   {
//     title: "Sức Bền Vật Liệu",
//     author: "Lê Quang Hùng",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Giới thiệu về tính chất cơ học của vật liệu và sức bền của chúng trong các cấu trúc cơ khí. Sách cung cấp phương pháp tính toán và phân tích sức bền của vật liệu dưới tác động của các lực khác nhau."
//   },
//   {
//     title: "Kỹ Thuật Điều Khiển Tự Động",
//     author: "Trần Văn Bảy",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách này tập trung vào các hệ thống điều khiển tự động trong ngành cơ khí, bao gồm điều khiển số, điều khiển tuyến tính và phi tuyến, cùng với các ứng dụng thực tế trong sản xuất và chế tạo."
//   },
//   {
//     title: "Chế Tạo Máy Công Cụ",
//     author: "Vũ Đình Thắng",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách cung cấp kiến thức về nguyên lý hoạt động và quá trình chế tạo các loại máy công cụ, từ máy tiện, máy phay đến các thiết bị gia công CNC hiện đại."
//   },
//   {
//     title: "Công Nghệ Hàn Hiện Đại",
//     author: "Nguyễn Văn Cường",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Giới thiệu về các phương pháp hàn tiên tiến như hàn MIG, TIG, và hàn laser, cùng với các ứng dụng và tiêu chuẩn trong ngành sản xuất cơ khí hiện đại."
//   },
//   {
//     title: "Kỹ Thuật Gia Công Áp Lực",
//     author: "Đỗ Hữu Thắng",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Sách giới thiệu về các phương pháp gia công áp lực như rèn, dập, và ép, cùng với các công nghệ mới trong quá trình chế tạo và sản xuất các sản phẩm cơ khí chất lượng cao."
//   },
//   {
//     title: "Kỹ Thuật Lắp Ráp Và Sửa Chữa Máy Móc",
//     author: "Phạm Xuân Quý",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách cung cấp các kỹ thuật và quy trình lắp ráp, bảo trì, và sửa chữa máy móc, từ các thiết bị cơ bản đến các hệ thống máy phức tạp, với nhiều ví dụ thực tiễn."
//   },
//   {
//     title: "Kỹ Thuật Thủy Lực Và Khí Nén",
//     author: "Lê Văn Khoa",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Giới thiệu về các hệ thống thủy lực và khí nén, từ nguyên lý hoạt động đến thiết kế và lắp đặt trong các hệ thống máy móc công nghiệp và cơ khí."
//   },
//   {
//     title: "Động Cơ Đốt Trong Và Ứng Dụng",
//     author: "Nguyễn Trọng Tín",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách này cung cấp cái nhìn toàn diện về động cơ đốt trong, từ nguyên lý hoạt động đến ứng dụng trong các lĩnh vực như ô tô, máy công nghiệp và các phương tiện giao thông."
//   }
// ];
// const books = [
//   {
//     title: "Kỹ Thuật Gia Công CNC Hiện Đại",
//     author: "Trần Văn Bình",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách cung cấp kiến thức toàn diện về công nghệ gia công CNC, từ cơ bản đến nâng cao. Nội dung tập trung vào lập trình CNC, tối ưu hóa quy trình gia công, và các ứng dụng thực tiễn trong công nghiệp chế tạo cơ khí."
//   },
//   {
//     title: "Thiết Kế Và Phân Tích Kết Cấu Cơ Khí",
//     author: "Nguyễn Quang Vinh",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách này cung cấp phương pháp phân tích và thiết kế các kết cấu cơ khí phức tạp, từ các bộ phận nhỏ đến hệ thống máy lớn. Nội dung sách bao gồm các kỹ thuật tính toán lực, mô-men, và tối ưu hóa kết cấu để tăng độ bền và hiệu suất."
//   },
//   {
//     title: "Nguyên Lý Hoạt Động Của Hệ Thống Khí Nén",
//     author: "Đỗ Văn Minh",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Sách trình bày nguyên lý hoạt động của các hệ thống khí nén trong công nghiệp cơ khí, từ các thiết bị cơ bản đến hệ thống điều khiển tự động. Các ứng dụng thực tiễn trong lắp ráp và vận hành máy móc được đề cập chi tiết."
//   },
//   {
//     title: "Công Nghệ Vật Liệu Cơ Khí",
//     author: "Lê Hùng Dũng",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách giúp người đọc hiểu rõ về các loại vật liệu cơ khí phổ biến, từ kim loại đến composite, và các phương pháp gia công chúng. Sách cũng bao gồm các bài toán tính toán độ bền, khả năng chịu lực của vật liệu trong các môi trường khác nhau."
//   },
//   {
//     title: "Thiết Kế Hệ Thống Thủy Lực",
//     author: "Phạm Thanh Tùng",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Sách giới thiệu cách thiết kế và lắp đặt các hệ thống thủy lực trong các máy móc công nghiệp. Các khái niệm cơ bản và kỹ thuật tiên tiến về hệ thống truyền động thủy lực được giải thích chi tiết, kèm theo ví dụ minh họa."
//   },
//   {
//     title: "Điều Khiển Tự Động Trong Cơ Khí",
//     author: "Nguyễn Minh Hải",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách tập trung vào các kỹ thuật điều khiển tự động trong ngành cơ khí, bao gồm điều khiển PID, điều khiển phản hồi, và các hệ thống điều khiển không dây. Nội dung thích hợp cho các kỹ sư muốn nâng cao kiến thức về điều khiển tự động hóa trong cơ khí."
//   },
//   {
//     title: "Công Nghệ Cơ Khí Chính Xác",
//     author: "Vũ Xuân Quý",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách cung cấp kiến thức về các kỹ thuật chế tạo cơ khí chính xác, từ gia công vi mô đến sản xuất các bộ phận cơ khí có độ chính xác cao. Các công nghệ mới nhất như in 3D kim loại cũng được đề cập."
//   },
//   {
//     title: "Tính Toán Và Mô Phỏng Cơ Khí",
//     author: "Trần Thanh Bình",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách này hướng dẫn người đọc cách sử dụng các phần mềm tính toán và mô phỏng cơ khí, từ các công cụ đơn giản như AutoCAD đến các phần mềm phân tích phần tử hữu hạn tiên tiến như ANSYS và SolidWorks."
//   },
//   {
//     title: "Quy Trình Lắp Ráp Và Kiểm Tra Máy Móc",
//     author: "Nguyễn Văn Sơn",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách giới thiệu quy trình lắp ráp và kiểm tra chất lượng máy móc sau khi chế tạo. Các kỹ thuật kiểm tra không phá hủy và phương pháp thử nghiệm để đảm bảo máy móc hoạt động ổn định cũng được thảo luận chi tiết."
//   },
//   {
//     title: "Ứng Dụng Robot Trong Sản Xuất Cơ Khí",
//     author: "Lê Văn Hoàng",
//     genre: "66ef97b76316ce75499684c7",
//     major: "66ef997d6316ce75499684ef",
//     summary: "Cuốn sách này cung cấp cái nhìn tổng quan về việc sử dụng robot trong các dây chuyền sản xuất cơ khí. Nội dung bao gồm từ lập trình robot đến tích hợp robot vào hệ thống sản xuất tự động hóa."
//   }
// ];
// const books = [
//   {
//     title: "Công Nghệ Điện Hiện Đại",
//     author: "Phạm Văn Lợi",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách cung cấp tổng quan về các công nghệ điện tiên tiến, từ sản xuất điện năng, truyền tải, cho đến các hệ thống điện hiện đại trong đời sống và công nghiệp."
//   },
//   {
//     title: "Hệ Thống Điện Công Nghiệp",
//     author: "Nguyễn Văn Hòa",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách này tập trung vào các hệ thống điện trong các ngành công nghiệp nặng. Nội dung bao gồm thiết kế, lắp đặt và bảo dưỡng hệ thống điện cho nhà máy, xí nghiệp."
//   },
//   {
//     title: "Điều Khiển Tự Động Trong Điện",
//     author: "Trần Quốc Dũng",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Sách trình bày về điều khiển tự động trong hệ thống điện, bao gồm các kỹ thuật điều khiển PID, điều khiển phản hồi, và điều khiển quá trình công nghiệp."
//   },
//   {
//     title: "Bảo Vệ Rơle Và Tự Động Hóa Điện",
//     author: "Lê Hồng Quân",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách giới thiệu về hệ thống bảo vệ rơle trong các mạng lưới điện hiện đại và vai trò của tự động hóa trong bảo vệ và vận hành an toàn hệ thống điện."
//   },
//   {
//     title: "Thiết Kế Hệ Thống Truyền Tải Điện",
//     author: "Đỗ Thanh Tùng",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Sách cung cấp hướng dẫn chi tiết về thiết kế hệ thống truyền tải điện từ nguồn đến các khu vực tiêu thụ điện, với các ví dụ thực tiễn về cách tối ưu hóa hiệu suất truyền tải."
//   },
//   {
//     title: "Điện Tử Công Suất",
//     author: "Nguyễn Hữu Tín",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách giải thích các nguyên lý của điện tử công suất, từ các linh kiện bán dẫn cho đến các ứng dụng trong truyền tải và điều khiển năng lượng điện."
//   },
//   {
//     title: "Hệ Thống Điện Năng Lượng Tái Tạo",
//     author: "Phạm Quang Khải",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Sách giới thiệu về các hệ thống điện năng lượng tái tạo, bao gồm điện gió, điện mặt trời, và các ứng dụng thực tế trong sản xuất và cung cấp điện năng."
//   },
//   {
//     title: "Công Nghệ Lưới Điện Thông Minh",
//     author: "Lê Minh Đức",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách này trình bày về các công nghệ lưới điện thông minh (smart grid), tập trung vào khả năng tự động điều chỉnh và tối ưu hóa hệ thống phân phối điện."
//   },
//   {
//     title: "Điều Khiển Và Vận Hành Hệ Thống Điện",
//     author: "Nguyễn Hùng Cường",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Sách cung cấp các kiến thức cơ bản và nâng cao về cách điều khiển và vận hành hệ thống điện lớn, bao gồm các quy trình bảo dưỡng và xử lý sự cố."
//   },
//   {
//     title: "Tối Ưu Hóa Mạng Lưới Điện",
//     author: "Trần Văn Thắng",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách giúp người đọc hiểu rõ về các phương pháp tối ưu hóa mạng lưới điện, từ việc phân bổ tài nguyên đến cân bằng tải, nhằm giảm thiểu tổn thất và tăng cường hiệu quả."
//   },
//   {
//     title: "Hệ Thống Điện Trong Nhà Máy Công Nghiệp",
//     author: "Vũ Văn Tiến",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách này giải thích cách thiết kế và lắp đặt các hệ thống điện trong nhà máy, từ việc cung cấp nguồn đến việc phân phối điện cho các thiết bị công nghiệp."
//   },
//   {
//     title: "Bảo Dưỡng Và Sửa Chữa Hệ Thống Điện",
//     author: "Nguyễn Đức Trung",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách này cung cấp quy trình và phương pháp bảo dưỡng, sửa chữa các hệ thống điện, giúp tăng tuổi thọ và hiệu suất của hệ thống."
//   },
//   {
//     title: "Thiết Kế Mạng Điện Nội Bộ",
//     author: "Trần Thanh Hùng",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách giúp người đọc nắm rõ quy trình thiết kế mạng điện nội bộ trong các tòa nhà, bao gồm cả các tiêu chuẩn an toàn và tiết kiệm điện năng."
//   },
//   {
//     title: "Điện Tử Công Nghệ Cao",
//     author: "Lê Xuân Tân",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách tập trung vào các công nghệ điện tử tiên tiến, với ứng dụng trong việc kiểm soát và vận hành các hệ thống điện hiện đại."
//   },
//   {
//     title: "Thiết Kế Và Lắp Ráp Hệ Thống Điện Gió",
//     author: "Đinh Quang Hưng",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách trình bày các nguyên lý thiết kế và lắp ráp hệ thống điện gió, từ việc lựa chọn vị trí đặt cột gió cho đến việc kết nối vào lưới điện quốc gia."
//   },
//   {
//     title: "Điện Năng Lượng Mặt Trời",
//     author: "Nguyễn Hải Đăng",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Sách giới thiệu cách thức hoạt động của hệ thống điện mặt trời, từ tấm pin năng lượng đến các bộ biến tần, cùng với các kỹ thuật tối ưu hóa hiệu suất của hệ thống."
//   },
//   {
//     title: "Bộ Chuyển Đổi Điện Và Ứng Dụng",
//     author: "Lý Quang Long",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách này tập trung vào các loại bộ chuyển đổi điện (inverter) và ứng dụng của chúng trong việc điều khiển và cung cấp năng lượng cho các hệ thống điện."
//   },
//   {
//     title: "Điều Khiển Động Cơ Điện",
//     author: "Phạm Đình Toàn",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách giới thiệu về các phương pháp điều khiển động cơ điện, từ điều khiển tốc độ, mô-men xoắn đến các hệ thống điều khiển từ xa cho động cơ."
//   },
//   {
//     title: "Kỹ Thuật Chiếu Sáng Hiện Đại",
//     author: "Nguyễn Văn Phúc",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Sách giới thiệu về kỹ thuật chiếu sáng hiện đại, bao gồm cách thiết kế hệ thống chiếu sáng hiệu quả và tiết kiệm năng lượng cho các công trình."
//   },
//   {
//     title: "Hệ Thống Điện Đa Nguồn",
//     author: "Võ Minh Tuấn",
//     genre: "66ef97a46316ce75499684c3",
//     major: "66ef99896316ce75499684f1",
//     summary: "Cuốn sách này cung cấp kiến thức về hệ thống điện đa nguồn, kết hợp giữa các nguồn năng lượng truyền thống và tái tạo nhằm tối ưu hóa nguồn cung cấp điện."
//   }
// ];
// const books = [
//   {
//     title: "Điện Tử Căn Bản",
//     author: "Nguyễn Văn An",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách giới thiệu các khái niệm cơ bản về điện tử, từ các linh kiện đơn giản đến các mạch điện phức tạp."
//   },
//   {
//     title: "Mạch Điện Tử Ứng Dụng",
//     author: "Trần Thị Bích",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách này trình bày về thiết kế và ứng dụng của các mạch điện tử trong thực tế, từ các sản phẩm tiêu dùng đến thiết bị công nghiệp."
//   },
//   {
//     title: "Điện Tử Số",
//     author: "Lê Minh Hoàng",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách giải thích nguyên lý hoạt động của các hệ thống điện tử số, bao gồm các mạch logic và thiết kế vi mạch."
//   },
//   {
//     title: "Vi Điều Khiển và Ứng Dụng",
//     author: "Nguyễn Quốc Bảo",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Sách cung cấp kiến thức về vi điều khiển, từ lập trình cơ bản đến các ứng dụng trong hệ thống tự động hóa."
//   },
//   {
//     title: "Mạch Nguồn Điện",
//     author: "Đỗ Huy Tuấn",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách này trình bày về các loại mạch nguồn điện, từ nguồn một chiều đến nguồn xoay chiều và các phương pháp điều chỉnh điện áp."
//   },
//   {
//     title: "Cảm Biến và Ứng Dụng Trong Điện Tử",
//     author: "Lê Văn Đạt",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách giới thiệu các loại cảm biến, nguyên lý hoạt động và ứng dụng của chúng trong các hệ thống điện tử hiện đại."
//   },
//   {
//     title: "Thiết Kế Mạch In Điện Tử",
//     author: "Trần Đình Khải",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách hướng dẫn cách thiết kế và sản xuất mạch in điện tử, từ việc chọn linh kiện đến lắp ráp mạch hoàn chỉnh."
//   },
//   {
//     title: "Kỹ Thuật Điện Tử Cao Cấp",
//     author: "Nguyễn Văn Phú",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách này đề cập đến các kỹ thuật điện tử tiên tiến, bao gồm mạch tích hợp, hệ thống nhúng và công nghệ MEMS."
//   },
//   {
//     title: "Phân Tích và Thiết Kế Mạch Điện Tử",
//     author: "Đinh Xuân Bình",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách cung cấp phương pháp phân tích và thiết kế các mạch điện tử phức tạp, kèm theo bài tập thực hành."
//   },
//   {
//     title: "Tự Động Hóa Trong Điện Tử",
//     author: "Lý Minh Cường",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Sách giới thiệu về các hệ thống tự động hóa trong điện tử, từ lập trình PLC đến điều khiển từ xa và các ứng dụng IoT."
//   },
//   {
//     title: "Điện Tử và Truyền Thông",
//     author: "Nguyễn Văn Hùng",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách này tập trung vào các nguyên lý cơ bản trong truyền thông điện tử, bao gồm các phương pháp mã hóa và giải mã tín hiệu."
//   },
//   {
//     title: "Xử Lý Tín Hiệu Điện Tử",
//     author: "Trần Minh Thái",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách cung cấp kiến thức về xử lý tín hiệu điện tử, từ các khái niệm cơ bản đến các thuật toán phức tạp."
//   },
//   {
//     title: "Mạch Khuếch Đại và Ứng Dụng",
//     author: "Đỗ Ngọc Hân",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách giới thiệu về các loại mạch khuếch đại, nguyên lý hoạt động và ứng dụng trong các thiết bị điện tử."
//   },
//   {
//     title: "Kỹ Thuật Thông Tin Điện Tử",
//     author: "Lê Đình Nghĩa",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách này trình bày về các công nghệ thông tin hiện đại trong điện tử, bao gồm các mạng truyền thông và giao thức."
//   },
//   {
//     title: "Phân Tích Định Tính Mạch Điện Tử",
//     author: "Trần Thị Hồng",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Sách cung cấp các phương pháp phân tích định tính các mạch điện tử, từ cách đọc sơ đồ đến phân tích chức năng."
//   },
//   {
//     title: "Tính Toán Trong Điện Tử",
//     author: "Nguyễn Minh Tâm",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách này giúp người đọc nắm vững các phương pháp tính toán trong thiết kế mạch điện tử, bao gồm cả mô phỏng và tính toán thực nghiệm."
//   },
//   {
//     title: "Điện Tử Thông Minh",
//     author: "Lý Văn Kiên",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách trình bày về các hệ thống điện tử thông minh, từ cảm biến thông minh đến các ứng dụng trong ngành công nghiệp 4.0."
//   },
//   {
//     title: "Kỹ Thuật Điện Tử Động Lực",
//     author: "Trần Văn Hải",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách này tập trung vào các nguyên lý kỹ thuật điện tử động lực, bao gồm động cơ điện và các hệ thống điều khiển động cơ."
//   },
//   {
//     title: "Điện Tử Dành Cho Sinh Viên",
//     author: "Nguyễn Ngọc Minh",
//     genre: "66ef97ad6316ce75499684c5",
//     major: "66ef99946316ce75499684f3",
//     summary: "Cuốn sách là tài liệu tham khảo hữu ích cho sinh viên điện tử, từ các khái niệm cơ bản đến ứng dụng thực tế trong ngành."
//   }
// ];

// const books = [
//   {
//     title: "Công Nghệ Động Lực Cơ Bản",
//     author: "Nguyễn Văn Nam",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách giới thiệu các khái niệm cơ bản về công nghệ động lực, từ động cơ đốt trong đến động cơ điện."
//   },
//   {
//     title: "Hệ Thống Điều Khiển Động Cơ",
//     author: "Trần Thị Hạnh",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách này trình bày về các hệ thống điều khiển động cơ, bao gồm các phương pháp điều khiển PID và điều khiển số."
//   },
//   {
//     title: "Động Lực Học",
//     author: "Lê Minh Tâm",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách giải thích nguyên lý động lực học trong các hệ thống cơ khí, với nhiều ví dụ thực tế."
//   },
//   {
//     title: "Thiết Kế Động Cơ Điện",
//     author: "Nguyễn Quốc Vinh",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách cung cấp kiến thức về thiết kế và lắp đặt động cơ điện, từ lý thuyết đến thực hành."
//   },
//   {
//     title: "Phân Tích Hệ Thống Động Lực",
//     author: "Đỗ Huy Bình",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách này tập trung vào việc phân tích các hệ thống động lực, từ mạch điện đến mạch cơ khí."
//   },
//   {
//     title: "Kỹ Thuật Động Lực Học",
//     author: "Trần Văn Nghĩa",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách giới thiệu các kỹ thuật động lực học hiện đại trong thiết kế và ứng dụng trong công nghiệp."
//   },
//   {
//     title: "Máy Nén và Ứng Dụng",
//     author: "Lý Văn Hoàng",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách này giải thích nguyên lý hoạt động của máy nén và các ứng dụng của chúng trong công nghệ động lực."
//   },
//   {
//     title: "Động Lực Tính Toán",
//     author: "Nguyễn Hữu Cường",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách cung cấp phương pháp tính toán cho các hệ thống động lực, từ mô hình hóa đến mô phỏng."
//   },
//   {
//     title: "Động Cơ Đốt Trong",
//     author: "Trần Quốc Thắng",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách này trình bày về cấu tạo, nguyên lý và ứng dụng của động cơ đốt trong trong công nghiệp."
//   },
//   {
//     title: "Động Lực Học Trong Kỹ Thuật",
//     author: "Lê Đình Hải",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách này tập trung vào việc áp dụng động lực học trong các lĩnh vực kỹ thuật khác nhau."
//   },
//   {
//     title: "Máy Bơm và Hệ Thống Bơm",
//     author: "Nguyễn Thế Vinh",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách cung cấp kiến thức về máy bơm, nguyên lý hoạt động và thiết kế hệ thống bơm."
//   },
//   {
//     title: "Công Nghệ Động Lực Hiện Đại",
//     author: "Đinh Ngọc Minh",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách giới thiệu các công nghệ động lực tiên tiến, từ động cơ điện đến hệ thống tự động hóa."
//   },
//   {
//     title: "Cơ Học Ứng Dụng Trong Động Lực",
//     author: "Trần Thị Mỹ",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách này đề cập đến việc áp dụng cơ học trong các thiết kế và phân tích hệ thống động lực."
//   },
//   {
//     title: "Năng Lượng Tái Tạo Trong Động Lực",
//     author: "Lê Văn Quang",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách này khám phá vai trò của năng lượng tái tạo trong các hệ thống động lực và ứng dụng thực tiễn."
//   },
//   {
//     title: "Mạch Điều Khiển Tự Động",
//     author: "Nguyễn Minh Kiên",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách này trình bày về các mạch điều khiển tự động trong hệ thống động lực, từ lý thuyết đến ứng dụng."
//   },
//   {
//     title: "Động Lực Trong Thiết Kế Máy Móc",
//     author: "Đỗ Hữu Tài",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách cung cấp kiến thức về động lực trong thiết kế máy móc, từ nguyên lý đến thực hành."
//   },
//   {
//     title: "Kỹ Thuật Nâng Cao Trong Động Lực",
//     author: "Lý Thị Hoa",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách này tập trung vào các kỹ thuật nâng cao trong công nghệ động lực và ứng dụng thực tế."
//   },
//   {
//     title: "Thực Hành Công Nghệ Động Lực",
//     author: "Nguyễn Văn Lộc",
//     genre: "66ef97cb6316ce75499684cb",
//     major: "66ef99a06316ce75499684f5",
//     summary: "Cuốn sách này là tài liệu thực hành giúp sinh viên và kỹ sư nắm vững các khái niệm trong công nghệ động lực."
//   }
// ];
// const books = [
//   {
//     title: "Nguyên Tắc Hóa Học",
//     author: "Nguyễn Văn Bình",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này giới thiệu những nguyên tắc cơ bản trong hóa học, từ các phản ứng hóa học đến các quy trình hóa học công nghiệp."
//   },
//   {
//     title: "Hóa Học Ứng Dụng Trong Công Nghệ",
//     author: "Trần Thị Mai",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách cung cấp cái nhìn tổng quan về ứng dụng của hóa học trong nhiều lĩnh vực công nghệ khác nhau, như dược phẩm và thực phẩm."
//   },
//   {
//     title: "Công Nghệ Hóa Học Thực Phẩm",
//     author: "Phạm Văn Khải",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này trình bày các phương pháp và công nghệ trong sản xuất và chế biến thực phẩm, cũng như các vấn đề an toàn thực phẩm."
//   },
//   {
//     title: "Hóa Học Vô Cơ",
//     author: "Nguyễn Thế Tài",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách tập trung vào các nguyên lý và phản ứng của hóa học vô cơ, cùng với ứng dụng trong các ngành công nghiệp."
//   },
//   {
//     title: "Hóa Học Hữu Cơ",
//     author: "Lê Văn Phúc",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách giới thiệu các hợp chất hữu cơ, phản ứng hóa học và các ứng dụng trong đời sống hàng ngày."
//   },
//   {
//     title: "Kỹ Thuật Hóa Học",
//     author: "Nguyễn Minh Hòa",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này trình bày các quy trình công nghệ hóa học, từ sản xuất đến kiểm soát chất lượng sản phẩm."
//   },
//   {
//     title: "Phân Tích Hóa Học",
//     author: "Trần Quốc Huy",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách cung cấp các phương pháp phân tích hóa học và ứng dụng trong nghiên cứu và phát triển sản phẩm mới."
//   },
//   {
//     title: "Hóa Học Môi Trường",
//     author: "Đặng Minh Tâm",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này thảo luận về tác động của hóa học đối với môi trường và các phương pháp để giảm thiểu ô nhiễm."
//   },
//   {
//     title: "Công Nghệ Sản Xuất Hóa Chất",
//     author: "Nguyễn Thị Lan",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này mô tả quy trình sản xuất hóa chất trong công nghiệp và các yếu tố ảnh hưởng đến hiệu quả sản xuất."
//   },
//   {
//     title: "Hóa Học Cho Kỹ Sư",
//     author: "Trần Văn Bình",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này giúp kỹ sư hiểu rõ về hóa học và cách ứng dụng vào trong thiết kế và phát triển sản phẩm."
//   },
//   {
//     title: "Tính Toán Hóa Học",
//     author: "Lê Hoàng An",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này hướng dẫn các kỹ thuật tính toán trong hóa học, bao gồm cả mô phỏng và phân tích dữ liệu."
//   },
//   {
//     title: "Kỹ Thuật Phân Tích Hóa Học",
//     author: "Nguyễn Quốc Bảo",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này cung cấp cái nhìn sâu sắc về các phương pháp phân tích hóa học hiện đại và ứng dụng của chúng."
//   },
//   {
//     title: "Hóa Học Dược Phẩm",
//     author: "Phạm Quang Minh",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này trình bày về hóa học trong sản xuất dược phẩm, từ phát hiện đến phát triển sản phẩm."
//   },
//   {
//     title: "Công Nghệ Sinh Học",
//     author: "Nguyễn Đức Hoàng",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này khám phá các ứng dụng của hóa học trong công nghệ sinh học và các phương pháp sản xuất sinh học."
//   },
//   {
//     title: "Hóa Học Lý Thuyết",
//     author: "Trần Văn Tùng",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này giới thiệu các khái niệm lý thuyết trong hóa học, giúp người đọc hiểu rõ hơn về cơ sở khoa học."
//   },
//   {
//     title: "Chất Liệu Hóa Học",
//     author: "Đặng Minh Tuấn",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này tập trung vào các loại vật liệu hóa học và ứng dụng của chúng trong sản xuất và công nghệ."
//   },
//   {
//     title: "Hóa Học Công Nghiệp",
//     author: "Lê Thanh Bình",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này trình bày về các quy trình hóa học trong ngành công nghiệp và cách tối ưu hóa quy trình sản xuất."
//   },
//   {
//     title: "An Toàn Hóa Chất",
//     author: "Nguyễn Quốc Tuân",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này cung cấp thông tin về an toàn trong sử dụng hóa chất, bao gồm các biện pháp phòng ngừa và ứng phó với sự cố."
//   },
//   {
//     title: "Cơ Sở Hóa Học",
//     author: "Trần Văn Khải",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này giới thiệu các khái niệm và nguyên lý cơ bản trong hóa học, làm nền tảng cho việc học các môn chuyên sâu hơn."
//   },
//   {
//     title: "Hóa Học và Thực Phẩm",
//     author: "Lê Văn Hưng",
//     genre: "66ef98156316ce75499684d9",
//     major: "66ef99a96316ce75499684f7",
//     summary: "Cuốn sách này khám phá mối liên hệ giữa hóa học và ngành thực phẩm, từ sản xuất đến bảo quản thực phẩm."
//   }
// ];
// const books = [
//   {
//     title: "Công Nghệ May Thời Trang",
//     author: "Nguyễn Thị Thúy",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này khám phá các công nghệ mới nhất trong ngành may thời trang, từ thiết kế đến sản xuất. Tác giả cung cấp cái nhìn sâu sắc về quy trình công nghiệp, bao gồm cả tự động hóa và các công cụ hỗ trợ thiết kế. Sách cũng thảo luận về ảnh hưởng của công nghệ đến xu hướng tiêu dùng và sự phát triển bền vững trong ngành."
//   },
//   {
//     title: "May Mặc Thông Minh: Xu Hướng Tương Lai",
//     author: "Trần Hồng Hà",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này giới thiệu về các xu hướng may mặc thông minh đang lên ngôi trong ngành thời trang. Tác giả phân tích các công nghệ như may 3D và vật liệu thông minh, giúp người đọc hiểu rõ hơn về cách những đổi mới này ảnh hưởng đến trải nghiệm người tiêu dùng và quá trình sản xuất. Ngoài ra, sách cũng cung cấp những dự đoán về tương lai của ngành may."
//   },
//   {
//     title: "Tạo Dáng Thời Trang: Nghệ Thuật và Kỹ Thuật",
//     author: "Nguyễn Minh Tâm",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này là một tài liệu quý giá cho những ai muốn nắm vững nghệ thuật tạo dáng thời trang. Tác giả chia sẻ các kỹ thuật thiết kế và cách lựa chọn chất liệu, đồng thời nhấn mạnh tầm quan trọng của sự sáng tạo trong việc xây dựng phong cách. Sách cũng cung cấp nhiều ví dụ minh họa và bài tập thực hành để người đọc có thể áp dụng ngay."
//   },
//   {
//     title: "Hướng Dẫn Kỹ Thuật May Chuyên Nghiệp",
//     author: "Lê Văn Khải",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này cung cấp hướng dẫn chi tiết về các kỹ thuật may chuyên nghiệp, bao gồm cả may tay và may máy. Tác giả chia sẻ những bí quyết để tạo ra sản phẩm hoàn hảo, từ việc chọn nguyên liệu cho đến quy trình hoàn thiện. Đặc biệt, sách có nhiều hình ảnh minh họa rõ ràng, giúp người đọc dễ dàng hiểu và thực hiện theo."
//   },
//   {
//     title: "Nguyên Tắc Cắt May Cơ Bản",
//     author: "Nguyễn Thế Anh",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này tập trung vào các nguyên tắc cắt may cơ bản, giúp người đọc hiểu rõ về cách chuẩn bị và thực hiện các kiểu dáng khác nhau. Tác giả trình bày chi tiết từng bước, từ đo đạc đến cắt vải, nhằm giúp người mới bắt đầu nắm vững kiến thức cần thiết. Bên cạnh đó, sách cũng chia sẻ các mẹo hay để tối ưu hóa quá trình cắt may."
//   },
//   {
//     title: "Phát Triển Thời Trang Bền Vững",
//     author: "Trần Thị Bích Ngọc",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này khám phá khái niệm thời trang bền vững, giải thích tầm quan trọng của việc bảo vệ môi trường trong ngành công nghiệp may mặc. Tác giả phân tích các chiến lược sản xuất bền vững và cách thức thay đổi thói quen tiêu dùng của người dân. Sách cung cấp những kiến thức cần thiết để người đọc có thể tham gia vào phong trào thời trang xanh."
//   },
//   {
//     title: "Thời Trang và Văn Hóa: Mối Liên Hệ Sâu Sắc",
//     author: "Lê Thị Yến",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này nghiên cứu mối liên hệ giữa thời trang và văn hóa trong xã hội hiện đại. Tác giả chỉ ra cách mà các yếu tố văn hóa tác động đến xu hướng thời trang, cũng như sự thay đổi trong cách nhìn nhận về cái đẹp. Sách bao gồm nhiều ví dụ thực tế và phân tích sâu sắc, giúp người đọc có cái nhìn toàn diện hơn về ngành công nghiệp này."
//   },
//   {
//     title: "Kinh Doanh Thời Trang: Chiến Lược và Tactics",
//     author: "Đỗ Văn Hòa",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này trình bày các chiến lược kinh doanh thành công trong ngành thời trang, từ marketing đến quản lý sản xuất. Tác giả chia sẻ những kinh nghiệm thực tế và bài học quý giá từ các thương hiệu nổi tiếng. Đặc biệt, sách có các case study giúp người đọc có thể áp dụng kiến thức vào thực tiễn."
//   },
//   {
//     title: "Thiết Kế Thời Trang 3D: Cách Cách Mạng Hóa Ngành May",
//     author: "Trần Văn Phúc",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này giới thiệu về công nghệ thiết kế thời trang 3D, giúp người đọc hiểu rõ hơn về cách thức mà công nghệ đang thay đổi ngành may. Tác giả trình bày cách sử dụng phần mềm thiết kế 3D và các công cụ liên quan, cùng với những lợi ích mà nó mang lại cho quy trình sản xuất. Sách cũng đưa ra các ví dụ minh họa để dễ dàng áp dụng."
//   },
//   {
//     title: "Cách Thức Tạo Dáng Thời Trang Chuyên Nghiệp",
//     author: "Nguyễn Thị Lâm",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này là hướng dẫn chi tiết về cách tạo dáng thời trang chuyên nghiệp, từ việc phác thảo đến việc thực hiện. Tác giả chia sẻ các kỹ thuật tạo hình và cách lựa chọn màu sắc phù hợp. Sách bao gồm nhiều bài tập thực hành, giúp người đọc có thể áp dụng ngay kiến thức đã học."
//   },
//   {
//     title: "Kỹ Năng May Nâng Cao",
//     author: "Lê Quốc Huy",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này cung cấp các kỹ năng may nâng cao, giúp người đọc mở rộng kiến thức và khả năng thực hành. Tác giả hướng dẫn cách thực hiện các sản phẩm phức tạp, từ may túi xách đến may trang phục dạ hội. Đặc biệt, sách có nhiều mẹo và kỹ thuật độc đáo để tạo ra sản phẩm chất lượng."
//   },
//   {
//     title: "Nguyên Tắc Chọn Chất Liệu Trong Thời Trang",
//     author: "Nguyễn Minh Quang",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này giới thiệu các nguyên tắc lựa chọn chất liệu trong ngành thời trang. Tác giả phân tích các loại vải phổ biến và cách chúng ảnh hưởng đến thiết kế. Sách cũng bao gồm các mẹo giúp người đọc lựa chọn chất liệu phù hợp với từng sản phẩm cụ thể."
//   },
//   {
//     title: "Thời Trang và Tâm Lý Người Tiêu Dùng",
//     author: "Trần Văn Tú",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này khám phá tâm lý người tiêu dùng trong ngành thời trang, từ động cơ mua sắm đến cảm xúc liên quan. Tác giả phân tích các xu hướng tiêu dùng hiện tại và dự đoán sự thay đổi trong hành vi mua sắm trong tương lai. Sách mang đến cái nhìn sâu sắc về cách mà thời trang ảnh hưởng đến đời sống xã hội."
//   },
//   {
//     title: "Ứng Dụng Công Nghệ Trong Thiết Kế Thời Trang",
//     author: "Nguyễn Thị Hà",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này giới thiệu về việc ứng dụng công nghệ trong thiết kế thời trang. Tác giả phân tích các công nghệ như in 3D và phần mềm thiết kế, giúp người đọc hiểu rõ cách mà những đổi mới này giúp tối ưu hóa quy trình sản xuất. Sách cũng thảo luận về tương lai của ngành công nghiệp may mặc trong bối cảnh công nghệ ngày càng phát triển."
//   },
//   {
//     title: "Nghệ Thuật Làm Đầm Thời Trang",
//     author: "Lê Thị Lan",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này tập trung vào nghệ thuật làm đầm thời trang, hướng dẫn từ cách chọn vải đến kỹ thuật may. Tác giả chia sẻ những bí quyết để tạo ra những chiếc đầm hoàn hảo, từ thiết kế đơn giản đến phức tạp. Sách có nhiều hình ảnh minh họa sinh động, giúp người đọc dễ dàng nắm bắt."
//   },
//   {
//     title: "Thế Giới Thời Trang: Những Nguyên Tắc Cơ Bản",
//     author: "Nguyễn Đức Huy",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này giới thiệu các nguyên tắc cơ bản trong thế giới thời trang, từ thiết kế đến sản xuất. Tác giả giải thích từng khái niệm một cách dễ hiểu, giúp người đọc có thể áp dụng vào thực tiễn. Sách cũng đề cập đến lịch sử phát triển của ngành thời trang, từ những ngày đầu đến nay."
//   },
//   {
//     title: "Thời Trang và Công Nghệ Thông Tin",
//     author: "Đỗ Minh Trí",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này phân tích mối quan hệ giữa thời trang và công nghệ thông tin, đặc biệt là trong lĩnh vực bán hàng trực tuyến. Tác giả trình bày cách mà công nghệ đã thay đổi cách tiêu dùng thời trang, từ việc thiết kế đến phân phối sản phẩm. Sách cũng thảo luận về tương lai của ngành trong bối cảnh công nghệ không ngừng phát triển."
//   },
//   {
//     title: "Phong Cách Thời Trang Cá Nhân",
//     author: "Nguyễn Hải Yến",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này hướng dẫn người đọc cách xây dựng phong cách thời trang cá nhân. Tác giả chia sẻ những bí quyết về cách phối đồ, chọn lựa màu sắc và phụ kiện, giúp người đọc tự tin hơn trong việc thể hiện bản thân qua thời trang. Sách cũng bao gồm nhiều ví dụ thực tế để minh họa cho các khái niệm."
//   },
//   {
//     title: "Lịch Sử Thời Trang: Từ Cổ Điển Đến Hiện Đại",
//     author: "Lê Thị Hương",
//     genre: "66ef97e36316ce75499684cf",
//     major: "66ef99ba6316ce75499684f9",
//     summary: "Cuốn sách này là một hành trình qua lịch sử thời trang, từ những bộ trang phục cổ điển đến các xu hướng hiện đại. Tác giả phân tích sự phát triển của thời trang qua các thời kỳ, giúp người đọc hiểu rõ hơn về ảnh hưởng của văn hóa và xã hội đến ngành công nghiệp này. Sách cũng thảo luận về các nhà thiết kế nổi tiếng và đóng góp của họ cho thế giới thời trang."
//   }
// ];
// const books = [
//   {
//     title: "Công Nghệ Làm Lạnh Hiện Đại",
//     author: "Nguyễn Hữu Vinh",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này khám phá các công nghệ làm lạnh hiện đại, từ hệ thống điều hòa không khí đến các thiết bị làm lạnh công nghiệp. Tác giả Nguyễn Hữu Vinh phân tích nguyên lý hoạt động, ứng dụng thực tế và lợi ích của từng công nghệ, giúp người đọc hiểu rõ hơn về tầm quan trọng của công nghệ trong cuộc sống hàng ngày. Sách cũng cung cấp cái nhìn sâu sắc về các xu hướng mới trong lĩnh vực làm lạnh, bao gồm các giải pháp tiết kiệm năng lượng và bảo vệ môi trường."
//   },
//   {
//     title: "Kỹ Thuật Lạnh: Nguyên Lý và Ứng Dụng",
//     author: "Trần Minh Châu",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này cung cấp một cái nhìn tổng quan về kỹ thuật lạnh, bao gồm các nguyên lý cơ bản và ứng dụng trong thực tiễn. Tác giả Trần Minh Châu giải thích các khái niệm từ cơ bản đến nâng cao, giúp sinh viên và người học nghề dễ dàng tiếp cận và áp dụng. Sách còn có các ví dụ minh họa cụ thể, bài tập thực hành và hướng dẫn thực hiện, rất hữu ích cho các kỹ sư và kỹ thuật viên trong ngành lạnh."
//   },
//   {
//     title: "Hệ Thống Điều Hòa Không Khí: Thiết Kế và Lắp Đặt",
//     author: "Lê Văn Tâm",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này hướng dẫn chi tiết về thiết kế và lắp đặt hệ thống điều hòa không khí. Tác giả Lê Văn Tâm cung cấp các bước thực hiện, từ tính toán công suất đến lựa chọn thiết bị, đảm bảo hệ thống hoạt động hiệu quả nhất. Sách cũng thảo luận về các vấn đề bảo trì và sửa chữa, giúp người đọc nắm vững quy trình và kỹ năng cần thiết trong nghề. Đây là tài liệu tham khảo quý giá cho cả sinh viên và các chuyên gia trong ngành."
//   },
//   {
//     title: "Năng Lượng Và Hệ Thống Làm Lạnh",
//     author: "Phạm Thị Hạnh",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này phân tích mối quan hệ giữa năng lượng và hệ thống làm lạnh, từ sản xuất đến tiêu thụ. Tác giả Phạm Thị Hạnh nêu rõ cách tối ưu hóa hiệu suất năng lượng trong các hệ thống làm lạnh, cũng như các công nghệ tiên tiến như làm lạnh sinh thái. Sách cũng đề cập đến các chính sách và quy định liên quan đến năng lượng trong ngành công nghiệp, giúp người đọc có cái nhìn tổng quan về tương lai của công nghệ làm lạnh bền vững."
//   },
//   {
//     title: "Hệ Thống Làm Lạnh Trung Tâm: Nguyên Lý và Thiết Kế",
//     author: "Đặng Minh Hoàng",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này tập trung vào các hệ thống làm lạnh trung tâm, bao gồm thiết kế, lắp đặt và bảo trì. Tác giả Đặng Minh Hoàng giải thích các nguyên lý hoạt động và các thiết bị chính trong hệ thống, giúp người đọc nắm vững kiến thức cần thiết. Sách cung cấp các trường hợp thực tế, giúp sinh viên và kỹ thuật viên áp dụng lý thuyết vào thực tiễn. Đây là tài liệu quý giá cho những ai làm việc trong ngành làm lạnh."
//   },
//   {
//     title: "Giải Pháp Làm Lạnh Sinh Thái",
//     author: "Nguyễn Thế Hùng",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này trình bày các giải pháp làm lạnh sinh thái, nhấn mạnh tầm quan trọng của bảo vệ môi trường trong ngành lạnh. Tác giả Nguyễn Thế Hùng khảo sát các công nghệ giảm thiểu khí thải và tiêu thụ năng lượng, đồng thời giới thiệu các sản phẩm và thiết bị thân thiện với môi trường. Cuốn sách cung cấp kiến thức cần thiết cho các nhà thiết kế và kỹ sư trong việc phát triển các hệ thống làm lạnh bền vững."
//   },
//   {
//     title: "Kỹ Thuật Làm Mát Bằng Nước",
//     author: "Lê Quang Khải",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này cung cấp cái nhìn chi tiết về kỹ thuật làm mát bằng nước, một trong những phương pháp làm lạnh hiệu quả và tiết kiệm năng lượng. Tác giả Lê Quang Khải giải thích nguyên lý hoạt động, ứng dụng và ưu nhược điểm của các hệ thống làm mát bằng nước. Cuốn sách cũng bao gồm hướng dẫn thiết kế và lắp đặt, giúp người đọc có cái nhìn tổng quan và áp dụng vào thực tế."
//   },
//   {
//     title: "Chất Lạnh và Ứng Dụng Trong Công Nghiệp",
//     author: "Trần Ngọc Minh",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này tập trung vào các chất lạnh sử dụng trong công nghiệp, từ đặc tính, ứng dụng đến các vấn đề an toàn. Tác giả Trần Ngọc Minh cung cấp thông tin chi tiết về các loại chất lạnh hiện có, quy trình bảo quản và vận chuyển. Sách cũng thảo luận về các tiêu chuẩn và quy định liên quan đến chất lạnh, giúp người đọc nắm rõ hơn về an toàn trong sử dụng."
//   },
//   {
//     title: "Kỹ Thuật Làm Lạnh Thực Phẩm",
//     author: "Nguyễn Văn Lộc",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này khám phá các phương pháp làm lạnh trong ngành thực phẩm, từ bảo quản đến chế biến. Tác giả Nguyễn Văn Lộc giải thích các công nghệ làm lạnh hiện đại và ảnh hưởng của chúng đến chất lượng thực phẩm. Cuốn sách cung cấp cái nhìn sâu sắc về tầm quan trọng của làm lạnh trong ngành thực phẩm, đồng thời đưa ra các khuyến nghị cho việc tối ưu hóa quy trình làm lạnh."
//   },
//   {
//     title: "Kỹ Thuật Hệ Thống Điều Hòa Không Khí",
//     author: "Lê Hải Đăng",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này cung cấp kiến thức cơ bản và nâng cao về hệ thống điều hòa không khí. Tác giả Lê Hải Đăng giải thích các nguyên lý hoạt động, thiết kế và lắp đặt hệ thống điều hòa, cũng như các vấn đề bảo trì và sửa chữa. Cuốn sách là tài liệu tham khảo hữu ích cho sinh viên và kỹ sư trong ngành, giúp họ nắm bắt kiến thức cần thiết để làm việc hiệu quả."
//   },
//   {
//     title: "Thiết Kế Hệ Thống Làm Lạnh",
//     author: "Nguyễn Thị Xuân",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này hướng dẫn chi tiết về thiết kế hệ thống làm lạnh. Tác giả Nguyễn Thị Xuân cung cấp các phương pháp tính toán và lựa chọn thiết bị, đảm bảo hệ thống hoạt động hiệu quả và tiết kiệm năng lượng. Sách cũng thảo luận về các tiêu chuẩn kỹ thuật cần thiết, giúp người đọc áp dụng lý thuyết vào thực tiễn."
//   },
//   {
//     title: "Các Ứng Dụng Của Nhiệt Độ Thấp",
//     author: "Trần Quốc Bảo",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này khám phá các ứng dụng của nhiệt độ thấp trong công nghệ lạnh và ngành công nghiệp. Tác giả Trần Quốc Bảo trình bày các công nghệ và thiết bị sử dụng nhiệt độ thấp, từ bảo quản thực phẩm đến ứng dụng trong y tế. Cuốn sách cũng đề cập đến các thách thức và xu hướng phát triển trong lĩnh vực này."
//   },
//   {
//     title: "Hệ Thống Làm Lạnh Cảm Ứng",
//     author: "Nguyễn Văn Cường",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này trình bày các hệ thống làm lạnh cảm ứng, một công nghệ tiên tiến trong ngành lạnh. Tác giả Nguyễn Văn Cường giải thích nguyên lý hoạt động, thiết kế và ứng dụng của hệ thống làm lạnh cảm ứng, giúp người đọc hiểu rõ hơn về lợi ích của công nghệ này trong việc tiết kiệm năng lượng và bảo vệ môi trường."
//   },
//   {
//     title: "Quản Lý Năng Lượng Trong Hệ Thống Làm Lạnh",
//     author: "Lê Hoàng Anh",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này tập trung vào quản lý năng lượng trong hệ thống làm lạnh, từ sản xuất đến tiêu thụ. Tác giả Lê Hoàng Anh nêu rõ các biện pháp tối ưu hóa hiệu suất năng lượng và giảm thiểu chi phí vận hành. Sách cũng thảo luận về các công nghệ mới và chính sách liên quan đến năng lượng trong ngành lạnh."
//   },
//   {
//     title: "Công Nghệ Làm Lạnh Bền Vững",
//     author: "Trần Hồng Phúc",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này giới thiệu các công nghệ làm lạnh bền vững, với mục tiêu bảo vệ môi trường và tiết kiệm năng lượng. Tác giả Trần Hồng Phúc khám phá các giải pháp sáng tạo trong lĩnh vực làm lạnh, từ thiết bị tiết kiệm năng lượng đến các chất lạnh thân thiện với môi trường. Sách cũng thảo luận về các chính sách và xu hướng toàn cầu trong ngành công nghiệp lạnh."
//   },
//   {
//     title: "Ứng Dụng Của Nhiệt Lạnh Trong Công Nghiệp",
//     author: "Nguyễn Thế Thắng",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này trình bày các ứng dụng của nhiệt lạnh trong công nghiệp, từ sản xuất đến chế biến. Tác giả Nguyễn Thế Thắng giải thích cách sử dụng nhiệt lạnh để nâng cao chất lượng sản phẩm và tiết kiệm chi phí sản xuất. Sách cũng đưa ra các nghiên cứu điển hình và hướng dẫn thực tế cho các nhà quản lý và kỹ sư."
//   },
//   {
//     title: "Hệ Thống Làm Lạnh Tự Động",
//     author: "Đỗ Quốc Huy",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này cung cấp cái nhìn tổng quan về hệ thống làm lạnh tự động, từ thiết kế đến vận hành. Tác giả Đỗ Quốc Huy giải thích các công nghệ tự động hóa trong hệ thống làm lạnh, giúp người đọc nắm vững quy trình và kỹ thuật cần thiết. Sách cũng thảo luận về các ứng dụng thực tế trong công nghiệp và thương mại."
//   },
//   {
//     title: "Chất Lạnh Thân Thiện Với Môi Trường",
//     author: "Nguyễn Thanh Sơn",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này khám phá các chất lạnh thân thiện với môi trường và ứng dụng của chúng trong ngành lạnh. Tác giả Nguyễn Thanh Sơn trình bày các đặc tính, ưu điểm và nhược điểm của từng loại chất lạnh, cùng với các giải pháp thay thế bền vững. Sách cũng đề cập đến các quy định và tiêu chuẩn an toàn liên quan đến việc sử dụng chất lạnh trong công nghiệp."
//   },
//   {
//     title: "Công Nghệ Làm Lạnh Thông Minh",
//     author: "Trần Văn Hùng",
//     genre: "66ef97c06316ce75499684c9",
//     major: "66ef99c46316ce75499684fb",
//     summary: "Cuốn sách này giới thiệu công nghệ làm lạnh thông minh, kết hợp giữa công nghệ thông tin và kỹ thuật lạnh. Tác giả Trần Văn Hùng trình bày các giải pháp làm lạnh thông minh, từ giám sát và điều khiển từ xa đến tối ưu hóa hiệu suất. Sách cung cấp kiến thức cần thiết cho các kỹ sư và nhà quản lý trong việc phát triển các hệ thống làm lạnh hiện đại."
//   },
// ];
// const books = [
//   {
//     title: "Kế Toán Tài Chính",
//     author: "Trần Minh Tuấn",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này trình bày các nguyên tắc cơ bản của kế toán tài chính, từ việc ghi chép giao dịch đến việc lập báo cáo tài chính. Tác giả Trần Minh Tuấn phân tích các chuẩn mực kế toán quốc tế và quy trình kế toán trong doanh nghiệp. Sách cũng bao gồm các ví dụ thực tiễn và bài tập giúp người đọc áp dụng kiến thức vào thực tế. Đặc biệt, sách nhấn mạnh tầm quan trọng của kế toán trong việc quản lý tài chính và đưa ra quyết định trong doanh nghiệp."
//   },
//   {
//     title: "Kiểm Toán Độc Lập",
//     author: "Lê Thị Hương",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này giới thiệu về kiểm toán độc lập, một phần quan trọng trong lĩnh vực kế toán. Tác giả Lê Thị Hương giải thích quy trình kiểm toán, từ lập kế hoạch đến thực hiện và lập báo cáo kiểm toán. Sách cung cấp kiến thức cần thiết cho các kiểm toán viên và nhà quản lý, bao gồm các kỹ thuật kiểm toán hiện đại và các vấn đề pháp lý liên quan. Cuốn sách cũng đưa ra các tình huống thực tế giúp người đọc hiểu rõ hơn về vai trò của kiểm toán độc lập trong việc bảo đảm tính trung thực của báo cáo tài chính."
//   },
//   {
//     title: "Kế Toán Chi Phí",
//     author: "Phạm Quốc Duy",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này tập trung vào kế toán chi phí, một lĩnh vực quan trọng trong việc quản lý tài chính doanh nghiệp. Tác giả Phạm Quốc Duy phân tích các phương pháp tính toán chi phí, từ chi phí cố định đến chi phí biến đổi. Sách cung cấp hướng dẫn chi tiết về cách lập báo cáo chi phí và phân tích chi phí để đưa ra quyết định kinh doanh hiệu quả. Đặc biệt, cuốn sách cũng trình bày các chiến lược tối ưu hóa chi phí nhằm nâng cao hiệu quả hoạt động của doanh nghiệp."
//   },
//   {
//     title: "Kế Toán Quản Trị",
//     author: "Nguyễn Minh Hoàng",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này cung cấp cái nhìn sâu sắc về kế toán quản trị, một công cụ quan trọng cho các nhà quản lý. Tác giả Nguyễn Minh Hoàng giải thích cách sử dụng thông tin kế toán để hỗ trợ quá trình ra quyết định và lập kế hoạch kinh doanh. Sách bao gồm các chủ đề như phân tích biến động chi phí, lập ngân sách và dự báo tài chính. Đặc biệt, cuốn sách cũng đề cập đến các công cụ quản trị hiện đại và cách áp dụng chúng trong thực tế."
//   },
//   {
//     title: "Báo Cáo Tài Chính",
//     author: "Trần Đức Lợi",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này trình bày chi tiết về cách lập và phân tích báo cáo tài chính. Tác giả Trần Đức Lợi hướng dẫn người đọc cách sử dụng các chỉ số tài chính để đánh giá hiệu quả hoạt động của doanh nghiệp. Sách cung cấp các ví dụ thực tế và bài tập giúp người đọc hiểu rõ hơn về cách tạo ra các báo cáo tài chính chất lượng. Ngoài ra, cuốn sách cũng thảo luận về vai trò của báo cáo tài chính trong việc thu hút nhà đầu tư và quản lý rủi ro tài chính."
//   },
//   {
//     title: "Phân Tích Tài Chính",
//     author: "Nguyễn Văn Bình",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này tập trung vào phân tích tài chính, giúp người đọc hiểu rõ hơn về các phương pháp đánh giá hiệu quả tài chính của doanh nghiệp. Tác giả Nguyễn Văn Bình trình bày các kỹ thuật phân tích tỷ lệ, dòng tiền và dự báo tài chính. Sách cũng đưa ra các tình huống thực tế và bài tập giúp người đọc áp dụng lý thuyết vào thực tế. Đặc biệt, cuốn sách cũng thảo luận về vai trò của phân tích tài chính trong việc đưa ra quyết định đầu tư và quản lý tài sản."
//   },
//   {
//     title: "Kế Toán Ngân Hàng",
//     author: "Đỗ Thị Kim Anh",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này trình bày các khía cạnh của kế toán trong ngành ngân hàng. Tác giả Đỗ Thị Kim Anh giải thích quy trình ghi chép giao dịch ngân hàng, lập báo cáo tài chính và quản lý rủi ro. Sách cung cấp cái nhìn tổng quan về các sản phẩm ngân hàng và cách chúng ảnh hưởng đến hoạt động kế toán. Cuốn sách cũng bao gồm các ví dụ và bài tập thực tiễn giúp người đọc áp dụng kiến thức vào lĩnh vực ngân hàng."
//   },
//   {
//     title: "Kiểm Toán Nội Bộ",
//     author: "Lê Thanh Hải",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này khám phá vai trò và tầm quan trọng của kiểm toán nội bộ trong doanh nghiệp. Tác giả Lê Thanh Hải phân tích quy trình thực hiện kiểm toán nội bộ, từ lập kế hoạch đến thực hiện và báo cáo kết quả. Sách cung cấp hướng dẫn chi tiết về các tiêu chuẩn kiểm toán và cách áp dụng chúng trong thực tế. Cuốn sách cũng nêu rõ lợi ích của kiểm toán nội bộ trong việc nâng cao hiệu quả quản lý và giảm thiểu rủi ro cho doanh nghiệp."
//   },
//   {
//     title: "Kế Toán Doanh Nghiệp",
//     author: "Nguyễn Thị Phương",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này cung cấp cái nhìn tổng quan về kế toán trong doanh nghiệp. Tác giả Nguyễn Thị Phương giải thích các quy trình kế toán cơ bản, từ ghi chép giao dịch đến lập báo cáo tài chính. Sách bao gồm các ví dụ thực tiễn và bài tập giúp người đọc nắm vững kiến thức. Đặc biệt, cuốn sách cũng thảo luận về các xu hướng mới trong kế toán doanh nghiệp, từ công nghệ thông tin đến các quy định pháp lý."
//   },
//   {
//     title: "Kế Toán Tài Chính Quốc Tế",
//     author: "Trần Quốc Việt",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này tập trung vào kế toán tài chính quốc tế, giúp người đọc hiểu rõ về các quy định và chuẩn mực kế toán quốc tế. Tác giả Trần Quốc Việt phân tích cách các doanh nghiệp toàn cầu áp dụng các nguyên tắc kế toán khác nhau trong hoạt động kinh doanh. Sách cung cấp các ví dụ thực tế và tình huống giúp người đọc nắm vững lý thuyết. Cuốn sách cũng đề cập đến các thách thức trong việc tuân thủ các quy định kế toán quốc tế."
//   },
//   {
//     title: "Kế Toán Thuế",
//     author: "Nguyễn Tiến Dũng",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này trình bày các khía cạnh của kế toán thuế, từ việc lập báo cáo thuế đến việc quản lý thuế trong doanh nghiệp. Tác giả Nguyễn Tiến Dũng giải thích các quy định pháp lý liên quan đến thuế và cách doanh nghiệp thực hiện nghĩa vụ thuế. Sách cũng đưa ra các chiến lược tối ưu hóa thuế và giảm thiểu rủi ro pháp lý. Đặc biệt, cuốn sách cung cấp các tình huống thực tế giúp người đọc áp dụng kiến thức vào công việc hàng ngày."
//   },
//   {
//     title: "Quản Lý Rủi Ro Tài Chính",
//     author: "Trần Văn Nghĩa",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này khám phá khía cạnh quản lý rủi ro tài chính trong doanh nghiệp. Tác giả Trần Văn Nghĩa phân tích các loại rủi ro tài chính và cách thức quản lý chúng. Sách cung cấp các phương pháp đánh giá rủi ro và lập kế hoạch giảm thiểu rủi ro hiệu quả. Cuốn sách cũng bao gồm các ví dụ thực tế và bài tập giúp người đọc áp dụng lý thuyết vào thực tiễn quản lý rủi ro."
//   },
//   {
//     title: "Kế Toán Trong Doanh Nghiệp Vừa Và Nhỏ",
//     author: "Nguyễn Thị Bích Ngọc",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này cung cấp hướng dẫn kế toán đặc thù cho doanh nghiệp vừa và nhỏ. Tác giả Nguyễn Thị Bích Ngọc giải thích cách thức tổ chức kế toán, từ ghi chép giao dịch đến lập báo cáo tài chính cho các doanh nghiệp nhỏ. Sách bao gồm các tình huống thực tế và bài tập giúp người đọc áp dụng kiến thức vào thực tế. Đặc biệt, cuốn sách cũng thảo luận về những thách thức mà doanh nghiệp vừa và nhỏ phải đối mặt trong quản lý tài chính."
//   },
//   {
//     title: "Kế Toán Tập Hợp",
//     author: "Đỗ Xuân Hòa",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này trình bày chi tiết về kế toán tập hợp, một phương pháp quan trọng trong việc ghi chép và quản lý chi phí. Tác giả Đỗ Xuân Hòa phân tích cách thức lập báo cáo chi phí và đánh giá hiệu quả hoạt động của doanh nghiệp. Sách cung cấp các ví dụ thực tế và bài tập giúp người đọc áp dụng kiến thức vào công việc hàng ngày. Cuốn sách cũng thảo luận về cách tối ưu hóa quy trình kế toán tập hợp để nâng cao hiệu quả quản lý."
//   },
//   {
//     title: "Kế Toán Quốc Tế",
//     author: "Nguyễn Hoàng Minh",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này khám phá các khía cạnh của kế toán quốc tế, từ quy định pháp lý đến chuẩn mực kế toán quốc tế. Tác giả Nguyễn Hoàng Minh trình bày cách thức các doanh nghiệp quốc tế áp dụng các nguyên tắc kế toán khác nhau. Sách cung cấp các ví dụ và tình huống thực tế giúp người đọc nắm vững lý thuyết. Cuốn sách cũng đề cập đến những thách thức trong việc áp dụng kế toán quốc tế trong bối cảnh toàn cầu hóa."
//   },
//   {
//     title: "Kế Toán Phân Tích",
//     author: "Trần Hồng Quân",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này tập trung vào kế toán phân tích, một công cụ hữu ích cho các nhà quản lý trong việc ra quyết định. Tác giả Trần Hồng Quân giải thích cách sử dụng thông tin kế toán để phân tích hiệu quả hoạt động và lập kế hoạch tài chính. Sách bao gồm các kỹ thuật phân tích chi phí, lập ngân sách và dự báo. Cuốn sách cũng đưa ra các ví dụ thực tế và bài tập giúp người đọc áp dụng lý thuyết vào thực tiễn quản lý tài chính."
//   },
//   {
//     title: "Kế Toán Đầu Tư",
//     author: "Lê Văn Thái",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef99d26316ce75499684fd",
//     summary: "Cuốn sách này giới thiệu về kế toán đầu tư, giúp người đọc hiểu rõ về quy trình ghi chép và phân tích các khoản đầu tư. Tác giả Lê Văn Thái phân tích các phương pháp đánh giá hiệu quả đầu tư và lập báo cáo tài chính liên quan đến đầu tư. Sách cũng bao gồm các tình huống thực tế và bài tập giúp người đọc áp dụng kiến thức vào thực tế. Đặc biệt, cuốn sách cũng thảo luận về các yếu tố rủi ro trong đầu tư và cách quản lý chúng."
//   }
// ];
// const books = [
//   {
//     title: "Kỹ Thuật Xây Dựng Cầu",
//     author: "Trần Minh Tuấn",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này giới thiệu các nguyên tắc cơ bản trong thiết kế và xây dựng cầu. Tác giả Trần Minh Tuấn phân tích các loại cầu khác nhau, từ cầu treo đến cầu bê tông. Các yếu tố kỹ thuật, tính toán tải trọng và điều kiện môi trường đều được thảo luận chi tiết. Sách cũng bao gồm các bài tập thực tiễn và ví dụ minh họa, giúp người đọc áp dụng lý thuyết vào thực tế. Cuốn sách phù hợp cho sinh viên ngành xây dựng và các kỹ sư mới ra trường."
//   },
//   {
//     title: "Công Nghệ Xây Dựng Hiện Đại",
//     author: "Lê Hoàng Anh",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này khám phá những công nghệ xây dựng tiên tiến đang được áp dụng trong ngành xây dựng hiện nay. Tác giả Lê Hoàng Anh giải thích các phương pháp xây dựng hiện đại, từ xây dựng bền vững đến sử dụng robot trong xây dựng. Sách cũng thảo luận về các xu hướng tương lai và tầm quan trọng của công nghệ trong việc nâng cao hiệu quả xây dựng. Thích hợp cho những ai quan tâm đến đổi mới và cải tiến trong ngành xây dựng."
//   },
//   {
//     title: "Kỹ Thuật Xây Dựng Công Trình Giao Thông",
//     author: "Nguyễn Thế Vinh",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này cung cấp kiến thức về kỹ thuật xây dựng các công trình giao thông như đường bộ, cầu và hầm. Tác giả Nguyễn Thế Vinh phân tích quy trình thiết kế, thi công và bảo trì các công trình giao thông. Sách bao gồm các ví dụ thực tế và tình huống, giúp người đọc hiểu rõ hơn về các thách thức trong xây dựng giao thông. Cuốn sách rất hữu ích cho sinh viên và kỹ sư trong lĩnh vực giao thông."
//   },
//   {
//     title: "Quản Lý Dự Án Xây Dựng",
//     author: "Đặng Minh Đức",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này trình bày các nguyên tắc và phương pháp quản lý dự án xây dựng hiệu quả. Tác giả Đặng Minh Đức chia sẻ kinh nghiệm thực tiễn trong việc lập kế hoạch, theo dõi tiến độ và quản lý rủi ro trong dự án xây dựng. Sách cũng đề cập đến các công cụ và phần mềm hỗ trợ quản lý dự án. Thích hợp cho những ai đang làm việc trong lĩnh vực quản lý dự án hoặc chuẩn bị cho sự nghiệp trong ngành xây dựng."
//   },
//   {
//     title: "Kỹ Thuật Xây Dựng Nhà Cao Tầng",
//     author: "Phan Đình Tâm",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này nghiên cứu các kỹ thuật và phương pháp xây dựng nhà cao tầng hiện đại. Tác giả Phan Đình Tâm giải thích các yếu tố cấu trúc, vật liệu và kỹ thuật thi công đặc thù cho các tòa nhà cao tầng. Sách cũng trình bày các vấn đề liên quan đến an toàn và bền vững trong xây dựng. Đây là tài liệu tham khảo quý giá cho sinh viên và kỹ sư trong lĩnh vực xây dựng."
//   },
//   {
//     title: "Thiết Kế Kết Cấu Bê Tông",
//     author: "Nguyễn Văn Bình",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này giới thiệu các nguyên lý thiết kế kết cấu bê tông theo tiêu chuẩn hiện hành. Tác giả Nguyễn Văn Bình cung cấp kiến thức sâu sắc về các loại kết cấu bê tông, từ cột, dầm đến sàn. Sách cũng đưa ra các ví dụ và bài tập thực hành, giúp người đọc hiểu rõ hơn về tính toán và thiết kế kết cấu. Đây là tài liệu không thể thiếu cho sinh viên ngành xây dựng và các kỹ sư chuyên về kết cấu."
//   },
//   {
//     title: "Kỹ Thuật Xây Dựng Thủy Công",
//     author: "Trần Ngọc Hiếu",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này khám phá các kỹ thuật xây dựng trong lĩnh vực thủy công như đê, kè và cống. Tác giả Trần Ngọc Hiếu phân tích các yếu tố thiết kế, thi công và bảo trì các công trình thủy công. Sách cũng cung cấp các ví dụ thực tiễn và hướng dẫn giúp người đọc áp dụng kiến thức vào thực tế. Đây là tài liệu tham khảo hữu ích cho sinh viên và kỹ sư trong lĩnh vực thủy công."
//   },
//   {
//     title: "Vật Liệu Xây Dựng",
//     author: "Lê Hải Nam",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này giới thiệu về các loại vật liệu xây dựng hiện đại, từ bê tông đến thép và gạch. Tác giả Lê Hải Nam phân tích tính chất, ứng dụng và cách thức sử dụng vật liệu trong xây dựng. Sách cũng đề cập đến các vấn đề về bền vững và ảnh hưởng của vật liệu đến môi trường. Thích hợp cho sinh viên ngành xây dựng và các nhà nghiên cứu trong lĩnh vực vật liệu."
//   },
//   {
//     title: "Kiến Trúc Xanh Trong Xây Dựng",
//     author: "Nguyễn Thị Hương",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này khám phá khái niệm kiến trúc xanh và vai trò của nó trong xây dựng hiện đại. Tác giả Nguyễn Thị Hương trình bày các phương pháp thiết kế và xây dựng bền vững, từ tiết kiệm năng lượng đến sử dụng vật liệu tái chế. Sách cũng thảo luận về các lợi ích môi trường và kinh tế của kiến trúc xanh. Đây là tài liệu hữu ích cho sinh viên và các chuyên gia trong ngành xây dựng."
//   },
//   {
//     title: "Xây Dựng Công Trình Ngầm",
//     author: "Trần Minh Thắng",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này cung cấp kiến thức về thiết kế và xây dựng các công trình ngầm như hầm, metro và hệ thống thoát nước. Tác giả Trần Minh Thắng phân tích các yếu tố kỹ thuật, an toàn và quy trình thi công trong xây dựng công trình ngầm. Sách cũng bao gồm các ví dụ và tình huống thực tế, giúp người đọc hiểu rõ hơn về các thách thức trong lĩnh vực này. Đây là tài liệu tham khảo quý giá cho sinh viên và kỹ sư chuyên về công trình ngầm."
//   },
//   {
//     title: "Quy Trình Thi Công Xây Dựng",
//     author: "Đặng Thị Kim Oanh",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này giới thiệu quy trình thi công xây dựng từ chuẩn bị, thi công cho đến hoàn thiện công trình. Tác giả Đặng Thị Kim Oanh phân tích các bước trong quy trình, các yếu tố ảnh hưởng đến tiến độ và chất lượng thi công. Sách cũng đề cập đến các vấn đề về quản lý nhân lực và an toàn trong thi công. Thích hợp cho sinh viên ngành xây dựng và những ai quan tâm đến quản lý thi công."
//   },
//   {
//     title: "Tính Toán Kết Cấu",
//     author: "Lê Văn Tiến",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này cung cấp các phương pháp tính toán kết cấu xây dựng, từ tính toán tải trọng đến phân tích ứng suất. Tác giả Lê Văn Tiến chia sẻ kinh nghiệm và kỹ thuật cần thiết để thực hiện các tính toán chính xác. Sách cũng bao gồm nhiều ví dụ thực tiễn và bài tập tự giải. Đây là tài liệu hữu ích cho sinh viên và kỹ sư trong ngành kết cấu."
//   },
//   {
//     title: "Kỹ Thuật Lắp Ghép Kết Cấu",
//     author: "Nguyễn Văn Tuân",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này khám phá kỹ thuật lắp ghép kết cấu trong xây dựng, từ lắp ghép thép đến bê tông. Tác giả Nguyễn Văn Tuân phân tích quy trình lắp ghép, các phương pháp thi công và thiết kế. Sách cũng trình bày các vấn đề liên quan đến an toàn và chất lượng trong lắp ghép kết cấu. Đây là tài liệu tham khảo hữu ích cho sinh viên và kỹ sư trong lĩnh vực lắp ghép kết cấu."
//   },
//   {
//     title: "Quản Lý Chi Phí Xây Dựng",
//     author: "Trần Hữu Nghĩa",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này trình bày các phương pháp và công cụ quản lý chi phí trong xây dựng. Tác giả Trần Hữu Nghĩa chia sẻ kinh nghiệm trong việc lập dự toán, theo dõi chi phí và quản lý ngân sách dự án xây dựng. Sách cũng đề cập đến các vấn đề về phân tích chi phí và tối ưu hóa chi phí. Thích hợp cho những ai làm việc trong lĩnh vực tài chính và quản lý dự án xây dựng."
//   },
//   {
//     title: "Hệ Thống Cấp Nước Trong Xây Dựng",
//     author: "Lê Minh Thành",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này cung cấp kiến thức về thiết kế và thi công hệ thống cấp nước trong các công trình xây dựng. Tác giả Lê Minh Thành phân tích các yếu tố kỹ thuật, quy trình thi công và bảo trì hệ thống cấp nước. Sách cũng bao gồm các ví dụ thực tiễn giúp người đọc áp dụng lý thuyết vào thực tế. Đây là tài liệu tham khảo quý giá cho sinh viên và kỹ sư trong lĩnh vực cấp nước."
//   },
//   {
//     title: "Kỹ Thuật Lắp Đặt Điện",
//     author: "Nguyễn Quốc Bảo",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này giới thiệu các kỹ thuật lắp đặt hệ thống điện trong các công trình xây dựng. Tác giả Nguyễn Quốc Bảo cung cấp kiến thức về thiết kế, thi công và bảo trì hệ thống điện. Sách cũng đề cập đến các tiêu chuẩn an toàn và chất lượng trong lắp đặt điện. Đây là tài liệu hữu ích cho sinh viên ngành điện và xây dựng."
//   },
//   {
//     title: "Bảo Trì và Quản Lý Công Trình Xây Dựng",
//     author: "Trần Minh Hòa",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99db6316ce75499684ff",
//     summary: "Cuốn sách này trình bày các phương pháp và kỹ thuật bảo trì công trình xây dựng. Tác giả Trần Minh Hòa chia sẻ kinh nghiệm trong việc quản lý và bảo trì các công trình, từ nhà ở đến công trình công cộng. Sách cũng đề cập đến các tiêu chí và quy trình đánh giá tình trạng công trình. Thích hợp cho sinh viên ngành xây dựng và các chuyên gia trong lĩnh vực bảo trì công trình."
//   }
// ];
// const books = [
//   {
//     title: "Luật Dân Sự Việt Nam",
//     author: "Trần Hữu Nguyên",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này cung cấp cái nhìn tổng quát về hệ thống luật dân sự tại Việt Nam, từ các nguyên tắc cơ bản đến các quy định cụ thể. Tác giả Trần Hữu Nguyên phân tích chi tiết các khía cạnh như quyền và nghĩa vụ của các bên, hợp đồng dân sự, và các vấn đề tranh chấp. Đây là tài liệu hữu ích cho sinh viên luật cũng như các luật sư trong hành nghề."
//   },
//   {
//     title: "Luật Hình Sự Việt Nam",
//     author: "Lê Thị Bích Ngọc",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách khám phá các quy định của luật hình sự Việt Nam, bao gồm các tội phạm, hình phạt và quy trình tố tụng. Tác giả Lê Thị Bích Ngọc trình bày rõ ràng các nội dung phức tạp, giúp người đọc hiểu rõ hơn về trách nhiệm hình sự và các biện pháp xử lý vi phạm pháp luật. Sách cũng đưa ra nhiều ví dụ thực tiễn để minh họa."
//   },
//   {
//     title: "Luật Thương Mại Quốc Tế",
//     author: "Nguyễn Thanh Sơn",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này đi sâu vào các vấn đề pháp lý liên quan đến thương mại quốc tế. Tác giả Nguyễn Thanh Sơn giải thích các quy định, hiệp định và luật lệ ảnh hưởng đến giao dịch thương mại toàn cầu. Sách cũng cung cấp những phân tích sâu sắc về tranh chấp thương mại và các phương pháp giải quyết chúng."
//   },
//   {
//     title: "Luật Lao Động",
//     author: "Phạm Minh Tuấn",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách cung cấp cái nhìn sâu sắc về luật lao động, bao gồm quyền lợi và nghĩa vụ của người lao động và người sử dụng lao động. Tác giả Phạm Minh Tuấn phân tích các khía cạnh như hợp đồng lao động, tiền lương, và điều kiện làm việc. Sách cũng đề cập đến các vấn đề tranh chấp lao động và cách giải quyết hiệu quả."
//   },
//   {
//     title: "Luật Đất Đai Việt Nam",
//     author: "Trần Quang Huy",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này giải thích các quy định về quyền sở hữu đất đai tại Việt Nam. Tác giả Trần Quang Huy đi sâu vào các quy trình cấp giấy chứng nhận quyền sử dụng đất, cũng như các vấn đề liên quan đến tranh chấp đất đai. Sách cũng cung cấp hướng dẫn thực tiễn cho người dân trong việc thực hiện quyền và nghĩa vụ liên quan đến đất đai."
//   },
//   {
//     title: "Luật Hôn Nhân và Gia Đình",
//     author: "Nguyễn Thị Mai",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này trình bày các quy định về hôn nhân và gia đình tại Việt Nam, từ việc kết hôn đến ly hôn và quyền nuôi con. Tác giả Nguyễn Thị Mai phân tích các vấn đề pháp lý liên quan đến quan hệ gia đình, bảo vệ quyền lợi của các bên và trẻ em. Sách là tài liệu tham khảo cần thiết cho các chuyên gia pháp lý và sinh viên luật."
//   },
//   {
//     title: "Luật Hành Chính",
//     author: "Đinh Văn Tùng",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này giới thiệu về các quy định và quy trình trong lĩnh vực hành chính. Tác giả Đinh Văn Tùng giải thích rõ ràng các khía cạnh như quyền hạn của cơ quan nhà nước, các thủ tục hành chính và quyền lợi của công dân. Sách cũng đề cập đến các biện pháp kháng cáo và giải quyết tranh chấp trong lĩnh vực hành chính."
//   },
//   {
//     title: "Luật Bảo Hiểm",
//     author: "Nguyễn Văn Được",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này trình bày các quy định về luật bảo hiểm tại Việt Nam, bao gồm bảo hiểm nhân thọ và bảo hiểm phi nhân thọ. Tác giả Nguyễn Văn Được phân tích chi tiết về quyền lợi và nghĩa vụ của các bên tham gia bảo hiểm. Sách cũng cung cấp các trường hợp thực tiễn để minh họa cho các quy định trong ngành bảo hiểm."
//   },
//   {
//     title: "Luật Tố Tụng Dân Sự",
//     author: "Lê Anh Tuấn",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này trình bày quy trình và nguyên tắc của luật tố tụng dân sự tại Việt Nam. Tác giả Lê Anh Tuấn giải thích các bước trong một vụ án dân sự, từ khởi kiện đến thi hành án. Sách cũng đề cập đến quyền và nghĩa vụ của các bên liên quan trong quá trình tố tụng, cung cấp kiến thức cần thiết cho sinh viên và luật sư."
//   },
//   {
//     title: "Luật Quốc Tế",
//     author: "Nguyễn Thị Kim Oanh",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này khám phá các quy định và nguyên tắc của luật quốc tế, bao gồm luật quốc tế công và luật quốc tế tư. Tác giả Nguyễn Thị Kim Oanh phân tích các vấn đề liên quan đến quan hệ giữa các quốc gia, tổ chức quốc tế và cá nhân. Sách cũng cung cấp cái nhìn tổng quan về các hiệp định quốc tế và cách chúng ảnh hưởng đến luật pháp trong nước."
//   },
//   {
//     title: "Luật Tình Nguyện và Tình Nguyện Viên",
//     author: "Trương Văn Hòa",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này bàn về các quy định liên quan đến tình nguyện và hoạt động của tình nguyện viên tại Việt Nam. Tác giả Trương Văn Hòa phân tích các quyền lợi, nghĩa vụ và trách nhiệm của tình nguyện viên. Sách cũng đề cập đến cách thức tổ chức các hoạt động tình nguyện và quản lý các chương trình này một cách hiệu quả."
//   },
//   {
//     title: "Luật Tài Chính",
//     author: "Lê Quốc Minh",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này trình bày các quy định về luật tài chính và quản lý tài chính công tại Việt Nam. Tác giả Lê Quốc Minh giải thích các vấn đề liên quan đến ngân sách nhà nước, thuế, và các hoạt động tài chính khác. Sách cũng cung cấp các phân tích và ví dụ thực tiễn về quản lý tài chính hiệu quả trong lĩnh vực công."
//   },
//   {
//     title: "Luật Công Nghệ Thông Tin",
//     author: "Nguyễn Văn Thắng",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này giới thiệu các quy định pháp lý liên quan đến công nghệ thông tin và truyền thông tại Việt Nam. Tác giả Nguyễn Văn Thắng phân tích các vấn đề về bảo vệ dữ liệu, an ninh mạng và quyền sử dụng công nghệ thông tin. Sách cũng đề cập đến các chính sách và chiến lược phát triển công nghệ thông tin trong nước."
//   },
//   {
//     title: "Luật Các Tổ Chức Quốc Tế",
//     author: "Đỗ Hoàng Khải",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này nghiên cứu về các tổ chức quốc tế và vai trò của chúng trong quan hệ quốc tế. Tác giả Đỗ Hoàng Khải phân tích cấu trúc, chức năng và quy định của các tổ chức như Liên Hợp Quốc, Ngân hàng Thế giới. Sách cũng cung cấp cái nhìn tổng quan về sự phát triển của luật quốc tế và ảnh hưởng của nó đối với luật pháp quốc gia."
//   },
//   {
//     title: "Luật Bảo Vệ Môi Trường",
//     author: "Nguyễn Thị Kim Anh",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này cung cấp cái nhìn tổng quát về các quy định và chính sách bảo vệ môi trường tại Việt Nam. Tác giả Nguyễn Thị Kim Anh phân tích các luật và quy định liên quan đến bảo vệ môi trường, bảo tồn tài nguyên thiên nhiên và phát triển bền vững. Sách cũng đưa ra các ví dụ thực tiễn về các hoạt động bảo vệ môi trường trong cộng đồng."
//   },
//   {
//     title: "Luật Quy Hoạch",
//     author: "Lê Văn Hải",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này bàn về quy định và quy trình liên quan đến quy hoạch sử dụng đất và đô thị. Tác giả Lê Văn Hải phân tích các vấn đề pháp lý trong quy hoạch, bao gồm quyền lợi của người dân và trách nhiệm của nhà nước. Sách cũng cung cấp hướng dẫn về cách thức tham gia vào quá trình quy hoạch và phát triển đô thị."
//   },
//   {
//     title: "Luật Nước",
//     author: "Nguyễn Hồng Phúc",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này nghiên cứu về các quy định liên quan đến nguồn nước và quyền khai thác, sử dụng nước. Tác giả Nguyễn Hồng Phúc phân tích các vấn đề bảo vệ nguồn nước, quản lý và phân bổ nước trong bối cảnh phát triển bền vững. Sách cũng đề cập đến các tranh chấp liên quan đến quyền sử dụng nước và biện pháp giải quyết."
//   },
//   {
//     title: "Luật Tố Tụng Hình Sự",
//     author: "Lê Văn Hùng",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này trình bày các quy định và quy trình trong tố tụng hình sự tại Việt Nam. Tác giả Lê Văn Hùng giải thích rõ các bước từ khởi tố đến xét xử, cũng như quyền và nghĩa vụ của các bên trong quá trình tố tụng. Sách là tài liệu tham khảo quan trọng cho các sinh viên luật và những người hành nghề luật."
//   },
//   {
//     title: "Luật Giao Thông Đường Bộ",
//     author: "Trần Minh Hòa",
//     genre: "66ef97d76316ce75499684cd",
//     major: "66ef99e86316ce7549968501",
//     summary: "Cuốn sách này cung cấp kiến thức về luật giao thông đường bộ tại Việt Nam. Tác giả Trần Minh Hòa phân tích các quy định về quyền và nghĩa vụ của người tham gia giao thông, cũng như các hình thức xử lý vi phạm. Sách cũng đề cập đến các biện pháp bảo đảm an toàn giao thông và nâng cao ý thức của người dân."
//   }
// ];
// const books = [
//   {
//     title: "English Grammar in Use",
//     author: "Raymond Murphy",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này là tài liệu hướng dẫn ngữ pháp tiếng Anh nổi tiếng, giúp người học tự học và cải thiện khả năng ngữ pháp. Tác giả Raymond Murphy cung cấp các lý thuyết ngữ pháp rõ ràng, dễ hiểu, kèm theo nhiều ví dụ thực tế và bài tập thực hành. Nội dung được chia thành nhiều chương ngắn, thuận tiện cho việc tra cứu. Sách phù hợp cho mọi trình độ từ cơ bản đến nâng cao, đặc biệt là những người chuẩn bị cho các kỳ thi tiếng Anh."
//   },
//   {
//     title: "Fluent English: Perfect Natural Speech, Sharpen Your Grammar, Master Idioms, Speak Fluently",
//     author: "Barbara Raifsnider",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này được thiết kế cho những người học tiếng Anh mong muốn nói tiếng Anh một cách tự nhiên và lưu loát hơn. Tác giả Barbara Raifsnider đưa ra các kỹ thuật, bài tập và mẹo hữu ích để cải thiện phát âm, ngữ điệu và sự tự tin khi giao tiếp. Cuốn sách cũng bao gồm các thành ngữ và cụm từ thường được sử dụng trong tiếng Anh hàng ngày, giúp người học có thể áp dụng vào thực tiễn giao tiếp một cách hiệu quả."
//   },
//   {
//     title: "The Elements of Style",
//     author: "William Strunk Jr. & E.B. White",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách nổi tiếng này là một hướng dẫn về phong cách viết tiếng Anh. Tác giả William Strunk Jr. và E.B. White nhấn mạnh sự cần thiết của việc viết ngắn gọn và rõ ràng, với những quy tắc cơ bản về ngữ pháp và cú pháp. Nội dung cuốn sách bao gồm các ví dụ minh họa và các mẹo viết hữu ích cho cả sinh viên và những người làm việc trong lĩnh vực viết lách. Đây là tài liệu không thể thiếu cho những ai muốn nâng cao kỹ năng viết của mình."
//   },
//   {
//     title: "Word Power Made Easy",
//     author: "Norman Lewis",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này là một hướng dẫn tuyệt vời để mở rộng vốn từ vựng tiếng Anh. Tác giả Norman Lewis sử dụng phương pháp tương tác để giúp người học ghi nhớ và áp dụng từ mới một cách hiệu quả. Sách được chia thành nhiều chương, mỗi chương cung cấp từ mới, giải thích, và bài tập thực hành giúp người học nhớ lâu. Đặc biệt, cuốn sách rất hữu ích cho những người chuẩn bị cho các kỳ thi như SAT, GRE, hay TOEFL."
//   },
//   {
//     title: "Oxford Word Skills: Intermediate",
//     author: "Ruth Gairns & Stuart Redman",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này tập trung vào việc phát triển kỹ năng từ vựng cho người học tiếng Anh ở trình độ trung cấp. Tác giả Ruth Gairns và Stuart Redman cung cấp các bài học về từ vựng đa dạng, kèm theo các hoạt động thực hành để củng cố kiến thức. Nội dung sách bao gồm các chủ đề thực tế từ cuộc sống hàng ngày, giúp người học áp dụng từ vựng vào thực tiễn. Cuốn sách cũng đi kèm với audio để hỗ trợ việc phát âm và nghe."
//   },
//   {
//     title: "Speak English Like an American",
//     author: "Amy Gillett",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này giúp người học tiếng Anh phát âm tự nhiên và chuẩn xác như người bản xứ. Tác giả Amy Gillett cung cấp nhiều bài học với các mẫu câu, thành ngữ và tình huống giao tiếp thực tế. Cuốn sách có nhiều bài tập thực hành và ghi âm để người học có thể luyện nghe và nói. Đây là tài liệu lý tưởng cho những ai muốn cải thiện khả năng giao tiếp tiếng Anh trong cuộc sống hàng ngày và trong công việc."
//   },
//   {
//     title: "English Idioms in Use",
//     author: "Michael McCarthy & Felicity O'Dell",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này khám phá các thành ngữ trong tiếng Anh, giúp người học hiểu và sử dụng chúng một cách tự nhiên. Tác giả Michael McCarthy và Felicity O'Dell cung cấp nhiều ví dụ và bài tập thực hành để người học có thể áp dụng thành ngữ vào ngữ cảnh thực tế. Sách cũng giúp người học nhận biết cách sử dụng thành ngữ trong văn viết và giao tiếp hàng ngày. Đây là tài liệu quý giá cho những ai muốn nâng cao trình độ tiếng Anh của mình."
//   },
//   {
//     title: "Practice Makes Perfect: English Verb Tenses",
//     author: "Dorothy Richmond",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này tập trung vào việc nâng cao kỹ năng sử dụng thì trong tiếng Anh. Tác giả Dorothy Richmond trình bày các quy tắc và ví dụ minh họa rõ ràng cho từng thì, cùng với các bài tập thực hành phong phú. Nội dung sách được thiết kế để giúp người học làm quen với các cấu trúc ngữ pháp phức tạp và sử dụng chúng một cách chính xác. Đây là tài liệu hữu ích cho cả sinh viên và người học tự do."
//   },
//   {
//     title: "The Complete English Grammar Rules",
//     author: "Farlex International",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này là một hướng dẫn toàn diện về các quy tắc ngữ pháp tiếng Anh. Tác giả Farlex International cung cấp đầy đủ các quy tắc từ cơ bản đến nâng cao, kèm theo ví dụ và bài tập để người học có thể thực hành. Nội dung sách được sắp xếp theo chủ đề, giúp người học dễ dàng tra cứu và áp dụng. Đây là tài liệu không thể thiếu cho những ai muốn củng cố nền tảng ngữ pháp của mình."
//   },
//   {
//     title: "English for Everyone: Level 1 Beginner, Course Book",
//     author: "DK",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này là tài liệu học tiếng Anh dành cho người mới bắt đầu. Tác giả DK thiết kế nội dung rõ ràng và sinh động, giúp người học dễ dàng tiếp cận các khái niệm cơ bản về ngữ pháp, từ vựng và phát âm. Sách bao gồm nhiều bài tập thực hành và hình ảnh minh họa giúp người học ghi nhớ nhanh. Đây là lựa chọn lý tưởng cho những ai muốn bắt đầu hành trình học tiếng Anh."
//   },
//   {
//     title: "Business English: The Writing Skills You Need for Today’s Workplace",
//     author: "M. R. Smith",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này cung cấp các kỹ năng viết tiếng Anh cần thiết trong môi trường làm việc hiện đại. Tác giả M. R. Smith hướng dẫn người học cách viết email, báo cáo và tài liệu kinh doanh một cách chuyên nghiệp. Nội dung sách bao gồm các mẫu văn bản và mẹo viết hữu ích, giúp người đọc tự tin hơn trong giao tiếp công việc. Đây là tài liệu cần thiết cho những ai muốn nâng cao kỹ năng viết trong lĩnh vực kinh doanh."
//   },
//   {
//     title: "The Joy of Vocabulary: A Fun Approach to Learning New Words",
//     author: "Judy H. Wong",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này giúp người học mở rộng từ vựng tiếng Anh một cách vui vẻ và thú vị. Tác giả Judy H. Wong thiết kế các hoạt động tương tác và trò chơi để người học có thể ghi nhớ từ mới dễ dàng hơn. Nội dung sách bao gồm các chủ đề đa dạng, từ cuộc sống hàng ngày đến công việc, giúp người học áp dụng từ vựng vào thực tiễn. Đây là lựa chọn tuyệt vời cho những ai muốn cải thiện vốn từ của mình một cách tự nhiên."
//   },
//   {
//     title: "Essential English Grammar",
//     author: "Raymond Murphy",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này cung cấp các quy tắc ngữ pháp cơ bản của tiếng Anh một cách dễ hiểu và trực quan. Tác giả Raymond Murphy sử dụng nhiều ví dụ và bài tập để người học có thể nắm vững kiến thức. Sách được chia thành nhiều chương ngắn, thuận tiện cho việc học và ôn tập. Đây là tài liệu lý tưởng cho những ai muốn củng cố nền tảng ngữ pháp tiếng Anh của mình."
//   },
//   {
//     title: "Speak Out: Upper Intermediate Student's Book",
//     author: "Frances Eales & Steve Oakes",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này giúp người học nâng cao khả năng giao tiếp tiếng Anh ở trình độ trung cấp. Tác giả Frances Eales và Steve Oakes cung cấp các bài học về kỹ năng nói và nghe thông qua nhiều chủ đề thực tế. Nội dung sách bao gồm bài tập nhóm và các hoạt động tương tác, giúp người học tự tin hơn khi giao tiếp. Đây là tài liệu phù hợp cho những ai muốn cải thiện khả năng nói tiếng Anh trong môi trường học tập và công việc."
//   },
//   {
//     title: "English for Specific Purposes: A Handbook for Teachers",
//     author: "Tom Hutchinson & Alan Waters",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này cung cấp hướng dẫn cho giáo viên về phương pháp giảng dạy tiếng Anh cho các lĩnh vực chuyên môn khác nhau. Tác giả Tom Hutchinson và Alan Waters phân tích nhu cầu ngôn ngữ của người học và cung cấp các chiến lược giảng dạy hiệu quả. Nội dung sách bao gồm các mẫu bài giảng và hoạt động thực tế, giúp giáo viên dễ dàng áp dụng trong lớp học. Đây là tài liệu hữu ích cho các giáo viên tiếng Anh chuyên ngành."
//   },
//   {
//     title: "American English File: Level 1",
//     author: "Christina Latham-Koenig & Clive Oxenden",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này là một tài liệu học tiếng Anh dành cho người mới bắt đầu. Tác giả Christina Latham-Koenig và Clive Oxenden thiết kế nội dung sinh động và hấp dẫn, giúp người học dễ dàng tiếp cận các khái niệm cơ bản về ngữ pháp, từ vựng và phát âm. Sách bao gồm nhiều hoạt động và bài tập thực hành giúp người học tự tin hơn khi giao tiếp. Đây là lựa chọn lý tưởng cho những ai muốn bắt đầu hành trình học tiếng Anh."
//   },
//   {
//     title: "How to Write Better Essays",
//     author: "Bryan Greetham",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này hướng dẫn người học cách viết luận văn hiệu quả và thuyết phục. Tác giả Bryan Greetham trình bày các bước cần thiết để lập kế hoạch, tổ chức và viết bài luận một cách rõ ràng. Nội dung sách bao gồm mẹo viết, các lỗi thường gặp và cách khắc phục. Đây là tài liệu hữu ích cho sinh viên và những ai muốn nâng cao kỹ năng viết của mình."
//   },
//   {
//     title: "Essential Words for the TOEFL",
//     author: "Stephen J. Chou",
//     genre: "66ef982b6316ce75499684df",
//     major: "66ef99f16316ce7549968503",
//     summary: "Cuốn sách này giúp người học chuẩn bị cho kỳ thi TOEFL bằng cách mở rộng vốn từ vựng. Tác giả Stephen J. Chou cung cấp danh sách từ cần thiết cùng với ví dụ và bài tập thực hành. Nội dung sách được thiết kế để người học có thể áp dụng từ vựng trong ngữ cảnh thi cử. Đây là tài liệu quý giá cho những ai đang chuẩn bị cho kỳ thi TOEFL."
//   }
// ];
// const books = [
//   {
//     title: "Quản trị kinh doanh",
//     author: "Lê Thẩm Dương",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này trình bày tổng quan về các nguyên tắc và phương pháp quản trị kinh doanh hiện đại. Lê Thẩm Dương đã khéo léo kết hợp lý thuyết và thực tiễn, giúp người đọc hiểu rõ cách thức xây dựng chiến lược kinh doanh và quản lý hiệu quả. Tác giả còn chia sẻ những câu chuyện thực tế và bài học quý giá từ kinh nghiệm của mình, từ đó khuyến khích người đọc phát triển tư duy chiến lược trong công việc và cuộc sống."
//   },
//   {
//     title: "Kỹ năng lãnh đạo",
//     author: "Nguyễn Hữu Trí",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Trong cuốn sách này, Nguyễn Hữu Trí cung cấp những bí quyết và kỹ năng cần thiết để trở thành một nhà lãnh đạo hiệu quả. Tác giả nhấn mạnh tầm quan trọng của việc giao tiếp, xây dựng mối quan hệ và tạo động lực cho đội ngũ. Nội dung sách còn đề cập đến việc phát triển phong cách lãnh đạo cá nhân, từ đó giúp người đọc nâng cao khả năng quản lý trong tổ chức."
//   },
//   {
//     title: "Chiến lược kinh doanh",
//     author: "Nguyễn Mạnh Hà",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này giúp người đọc nắm bắt được các khái niệm và công cụ cần thiết để xây dựng chiến lược kinh doanh hiệu quả. Nguyễn Mạnh Hà phân tích các yếu tố ảnh hưởng đến quyết định chiến lược và cách thức mà doanh nghiệp có thể tối ưu hóa nguồn lực. Tác giả cũng cung cấp các ví dụ thực tế, giúp người đọc hiểu rõ hơn về cách áp dụng lý thuyết vào thực tiễn."
//   },
//   {
//     title: "Tư duy nhanh và chậm",
//     author: "Daniel Kahneman",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Mặc dù tác giả không phải người Việt, nhưng cuốn sách này đã được dịch sang tiếng Việt và rất nổi tiếng trong giới quản trị. Cuốn sách khám phá hai hệ thống tư duy: một là nhanh nhạy và trực giác, hai là chậm rãi và logic. Qua đó, tác giả giúp người đọc hiểu rõ hơn về cách thức ra quyết định trong kinh doanh, từ đó nâng cao khả năng phân tích và quản lý rủi ro."
//   },
//   {
//     title: "Nghệ thuật lãnh đạo",
//     author: "Nguyễn Thành Nam",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này cung cấp cái nhìn sâu sắc về nghệ thuật lãnh đạo trong doanh nghiệp. Nguyễn Thành Nam chia sẻ các nguyên tắc vàng trong quản trị, từ việc xây dựng đội ngũ đến việc tạo ra môi trường làm việc tích cực. Nội dung sách không chỉ dừng lại ở lý thuyết mà còn bao gồm những câu chuyện thực tế, giúp người đọc áp dụng kiến thức vào công việc hàng ngày."
//   },
//   {
//     title: "Quản trị thương hiệu",
//     author: "Trần Hoàng",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này khám phá các khía cạnh quan trọng trong việc xây dựng và quản lý thương hiệu. Trần Hoàng đưa ra những chiến lược để tạo dựng giá trị thương hiệu và duy trì lòng trung thành của khách hàng. Nội dung sách rất phù hợp cho những ai đang làm việc trong lĩnh vực tiếp thị và quản trị thương hiệu, giúp họ hiểu rõ cách tạo dựng hình ảnh mạnh mẽ cho doanh nghiệp."
//   },
//   {
//     title: "Kinh doanh quốc tế",
//     author: "Lê Văn Hòa",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này cung cấp cái nhìn tổng quát về kinh doanh quốc tế và các yếu tố ảnh hưởng đến hoạt động thương mại toàn cầu. Lê Văn Hòa phân tích các chiến lược xâm nhập thị trường, quản lý rủi ro và tối ưu hóa quy trình xuất nhập khẩu. Nội dung sách rất hữu ích cho những ai muốn mở rộng kinh doanh ra thị trường quốc tế."
//   },
//   {
//     title: "Quản trị nhân sự",
//     author: "Nguyễn Thị Ngọc",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này khám phá các nguyên tắc và kỹ thuật quản trị nhân sự trong doanh nghiệp. Nguyễn Thị Ngọc chia sẻ về quy trình tuyển dụng, đào tạo và phát triển nhân viên, từ đó tạo dựng đội ngũ vững mạnh. Nội dung sách rất thực tiễn, giúp các nhà quản lý hiểu rõ hơn về cách tối ưu hóa nguồn nhân lực trong tổ chức."
//   },
//   {
//     title: "Tư duy chiến lược",
//     author: "Trần Văn Hải",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này tập trung vào việc phát triển tư duy chiến lược trong quản trị. Trần Văn Hải hướng dẫn người đọc cách phân tích thị trường, đánh giá đối thủ cạnh tranh và xây dựng kế hoạch chiến lược dài hạn. Tác giả cũng chia sẻ những bài học từ các doanh nghiệp thành công, giúp người đọc áp dụng vào thực tiễn."
//   },
//   {
//     title: "Đổi mới sáng tạo trong doanh nghiệp",
//     author: "Nguyễn Minh Tuấn",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này giúp người đọc khám phá các khái niệm về đổi mới sáng tạo trong kinh doanh. Nguyễn Minh Tuấn phân tích vai trò của sáng tạo trong việc phát triển sản phẩm và dịch vụ, đồng thời cung cấp các phương pháp để khuyến khích tư duy sáng tạo trong đội ngũ. Đây là tài liệu hữu ích cho các doanh nhân muốn cải thiện khả năng cạnh tranh của doanh nghiệp."
//   },
//   {
//     title: "Chiến lược marketing",
//     author: "Nguyễn Thị Hà",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này trình bày các chiến lược marketing hiện đại và cách áp dụng chúng vào doanh nghiệp. Nguyễn Thị Hà phân tích thị trường, xác định khách hàng mục tiêu và xây dựng chiến dịch quảng cáo hiệu quả. Nội dung sách rất thực tiễn, giúp các nhà quản lý và chuyên viên marketing nâng cao kỹ năng và kiến thức trong lĩnh vực này."
//   },
//   {
//     title: "Thương mại điện tử",
//     author: "Trần Minh Quân",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này cung cấp cái nhìn tổng quan về thương mại điện tử và những cơ hội mà nó mang lại cho doanh nghiệp. Trần Minh Quân phân tích các mô hình kinh doanh trực tuyến, cách tối ưu hóa trang web và thu hút khách hàng. Nội dung sách rất phù hợp cho những ai muốn phát triển doanh nghiệp trên nền tảng số."
//   },
//   {
//     title: "Quản trị dự án",
//     author: "Lê Hoàng Sơn",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này giới thiệu các nguyên tắc và công cụ quản trị dự án hiệu quả. Lê Hoàng Sơn hướng dẫn người đọc cách lập kế hoạch, theo dõi tiến độ và đánh giá kết quả dự án. Nội dung sách rất hữu ích cho các nhà quản lý dự án và những ai đang làm việc trong lĩnh vực này."
//   },
//   {
//     title: "Kỹ năng đàm phán",
//     author: "Nguyễn Quốc Huy",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này giúp người đọc phát triển kỹ năng đàm phán trong môi trường kinh doanh. Nguyễn Quốc Huy chia sẻ các chiến lược và kỹ thuật để đạt được thỏa thuận tốt nhất. Nội dung sách còn cung cấp các ví dụ thực tế và bài học từ kinh nghiệm của tác giả, giúp người đọc tự tin hơn khi tham gia vào các cuộc đàm phán."
//   },
//   {
//     title: "Phân tích dữ liệu trong kinh doanh",
//     author: "Trần Thị Minh",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này khám phá vai trò của phân tích dữ liệu trong quyết định kinh doanh. Trần Thị Minh giới thiệu các công cụ và kỹ thuật phân tích dữ liệu để tối ưu hóa hoạt động và chiến lược kinh doanh. Nội dung sách rất thực tiễn, giúp người đọc hiểu rõ hơn về cách sử dụng dữ liệu để nâng cao hiệu quả kinh doanh."
//   },
//   {
//     title: "Quản lý rủi ro trong doanh nghiệp",
//     author: "Nguyễn Minh Châu",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này trình bày các khái niệm và phương pháp quản lý rủi ro trong doanh nghiệp. Nguyễn Minh Châu phân tích các loại rủi ro và cách thức giảm thiểu ảnh hưởng của chúng đến hoạt động kinh doanh. Nội dung sách rất hữu ích cho các nhà quản lý trong việc xây dựng chiến lược bảo vệ doanh nghiệp."
//   },
//   {
//     title: "Khởi nghiệp",
//     author: "Đặng Văn Khoa",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này cung cấp hướng dẫn và chiến lược cho những ai muốn khởi nghiệp. Đặng Văn Khoa chia sẻ kinh nghiệm và bài học từ các doanh nhân thành công, từ đó giúp người đọc hiểu rõ hơn về quá trình khởi nghiệp. Nội dung sách còn đề cập đến các thách thức và cách vượt qua chúng trong hành trình xây dựng doanh nghiệp."
//   },
//   {
//     title: "Làm chủ tài chính",
//     author: "Nguyễn Thế Bảo",
//     genre: "66ef985e6316ce75499684e7",
//     major: "66ef99ff6316ce7549968505",
//     summary: "Cuốn sách này hướng dẫn người đọc cách quản lý tài chính cá nhân và doanh nghiệp hiệu quả. Nguyễn Thế Bảo chia sẻ các nguyên tắc và chiến lược để tối ưu hóa chi phí và đầu tư. Nội dung sách rất thực tiễn, giúp người đọc xây dựng nền tảng tài chính vững mạnh cho bản thân và tổ chức."
//   },
// ];
// const books = [
//   {
//     title: "Nguyên lý tài chính doanh nghiệp",
//     author: "Nguyễn Đình Thọ",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này cung cấp cái nhìn tổng quan về nguyên lý tài chính trong doanh nghiệp. Tác giả Nguyễn Đình Thọ phân tích các khái niệm cơ bản như vốn, chi phí vốn, và cấu trúc vốn. Nội dung sách còn hướng dẫn người đọc cách lập kế hoạch tài chính, phân tích báo cáo tài chính và ra quyết định đầu tư. Đặc biệt, cuốn sách cũng đề cập đến các yếu tố tác động đến giá trị doanh nghiệp, từ đó giúp người quản lý xây dựng chiến lược tài chính hiệu quả."
//   },
//   {
//     title: "Quản lý tài chính cá nhân",
//     author: "Trần Quốc Toàn",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này giúp người đọc hiểu rõ hơn về cách quản lý tài chính cá nhân. Tác giả Trần Quốc Toàn chia sẻ các bí quyết để tiết kiệm, đầu tư và lập kế hoạch chi tiêu thông minh. Nội dung sách bao gồm các phương pháp để xây dựng ngân sách cá nhân, quản lý nợ và đầu tư vào các tài sản sinh lời. Qua đó, người đọc có thể tạo ra nền tảng tài chính vững chắc cho bản thân và gia đình."
//   },
//   {
//     title: "Ngân hàng thương mại",
//     author: "Lê Thị Kim Anh",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này khám phá các chức năng và hoạt động của ngân hàng thương mại. Tác giả Lê Thị Kim Anh giải thích các sản phẩm ngân hàng như cho vay, huy động vốn và dịch vụ ngân hàng điện tử. Nội dung sách cũng đề cập đến các quy định pháp lý và quản lý rủi ro trong hoạt động ngân hàng. Đây là tài liệu hữu ích cho những ai muốn hiểu rõ hơn về ngành ngân hàng và các dịch vụ tài chính."
//   },
//   {
//     title: "Tài chính doanh nghiệp trong môi trường toàn cầu",
//     author: "Trần Mạnh Hùng",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này trình bày các khái niệm tài chính doanh nghiệp trong bối cảnh toàn cầu hóa. Tác giả Trần Mạnh Hùng phân tích cách các yếu tố toàn cầu ảnh hưởng đến tài chính doanh nghiệp, từ tỷ giá hối đoái đến chính sách thuế. Nội dung sách còn đưa ra các chiến lược để quản lý tài chính trong môi trường kinh doanh quốc tế, giúp người đọc có cái nhìn tổng quan về cách vận dụng lý thuyết vào thực tiễn."
//   },
//   {
//     title: "Kinh tế tiền tệ",
//     author: "Nguyễn Thị Minh",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này khám phá vai trò của tiền tệ trong nền kinh tế. Tác giả Nguyễn Thị Minh giải thích các chức năng của tiền tệ, các loại tiền tệ và cơ chế hoạt động của hệ thống ngân hàng. Nội dung sách còn phân tích các chính sách tiền tệ và tác động của chúng đến lạm phát và tăng trưởng kinh tế. Đây là tài liệu cơ bản cho những ai muốn hiểu rõ hơn về hệ thống tài chính."
//   },
//   {
//     title: "Phân tích tài chính",
//     author: "Đỗ Minh Hoàng",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này hướng dẫn người đọc cách phân tích tài chính doanh nghiệp thông qua các chỉ số và báo cáo tài chính. Tác giả Đỗ Minh Hoàng trình bày các phương pháp tính toán, phân tích tỷ lệ tài chính và đánh giá hiệu quả hoạt động của doanh nghiệp. Nội dung sách còn bao gồm các chiến lược để cải thiện hiệu suất tài chính, giúp người đọc có cái nhìn sâu sắc về tình hình tài chính của doanh nghiệp."
//   },
//   {
//     title: "Nguyên lý ngân hàng",
//     author: "Nguyễn Văn Phúc",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này cung cấp kiến thức cơ bản về nguyên lý hoạt động của ngân hàng. Tác giả Nguyễn Văn Phúc giải thích các khái niệm như cho vay, huy động vốn, và quản lý rủi ro. Nội dung sách còn đề cập đến vai trò của ngân hàng trong nền kinh tế và các dịch vụ ngân hàng hiện đại. Đây là tài liệu thiết thực cho những ai muốn tìm hiểu về ngành ngân hàng."
//   },
//   {
//     title: "Tài chính quốc tế",
//     author: "Lê Thanh Bình",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này khám phá các khía cạnh của tài chính quốc tế. Tác giả Lê Thanh Bình phân tích các yếu tố ảnh hưởng đến thị trường tài chính toàn cầu và cách thức giao dịch quốc tế diễn ra. Nội dung sách còn đề cập đến các rủi ro trong giao dịch tài chính quốc tế và các chiến lược quản lý rủi ro. Đây là tài liệu quan trọng cho những ai làm việc trong lĩnh vực tài chính quốc tế."
//   },
//   {
//     title: "Lý thuyết tài chính",
//     author: "Nguyễn Thanh Sơn",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này cung cấp cái nhìn tổng quan về lý thuyết tài chính. Tác giả Nguyễn Thanh Sơn giải thích các khái niệm cơ bản như giá trị hiện tại, giá trị tương lai, và lợi suất. Nội dung sách còn đề cập đến các mô hình tài chính và ứng dụng của chúng trong ra quyết định đầu tư. Đây là tài liệu thiết thực cho sinh viên và chuyên gia trong lĩnh vực tài chính."
//   },
//   {
//     title: "Quản trị rủi ro tài chính",
//     author: "Trần Thị Tuyết",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này khám phá các phương pháp quản trị rủi ro trong lĩnh vực tài chính. Tác giả Trần Thị Tuyết cung cấp các công cụ và kỹ thuật để đánh giá và quản lý rủi ro tài chính. Nội dung sách còn đề cập đến các chiến lược bảo hiểm và phòng ngừa rủi ro, giúp người đọc có cái nhìn tổng quát về cách quản lý rủi ro trong hoạt động tài chính."
//   },
//   {
//     title: "Chiến lược đầu tư",
//     author: "Lê Minh Quân",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này hướng dẫn người đọc xây dựng chiến lược đầu tư hiệu quả. Tác giả Lê Minh Quân phân tích các yếu tố cần xem xét khi đầu tư và các loại hình đầu tư khác nhau. Nội dung sách cũng cung cấp các kỹ thuật phân tích thị trường và đánh giá cổ phiếu, từ đó giúp người đọc đưa ra quyết định đầu tư thông minh."
//   },
//   {
//     title: "Tài chính và kinh tế vĩ mô",
//     author: "Nguyễn Hoàng Minh",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này khám phá mối quan hệ giữa tài chính và kinh tế vĩ mô. Tác giả Nguyễn Hoàng Minh phân tích các yếu tố vĩ mô như lãi suất, lạm phát và tăng trưởng kinh tế, từ đó giải thích cách thức mà chúng ảnh hưởng đến hoạt động tài chính. Nội dung sách còn đề cập đến các chính sách tài chính và kinh tế, giúp người đọc hiểu rõ hơn về bối cảnh tài chính toàn cầu."
//   },
//   {
//     title: "Quản trị ngân hàng",
//     author: "Lê Văn Tùng",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này cung cấp cái nhìn tổng quan về quản trị ngân hàng. Tác giả Lê Văn Tùng phân tích các khái niệm như quản lý tài sản, quản lý nợ và quản lý rủi ro trong ngân hàng. Nội dung sách còn đề cập đến các quy định và thực tiễn trong ngành ngân hàng, giúp người đọc nắm bắt các thách thức và cơ hội trong quản trị ngân hàng."
//   },
//   {
//     title: "Đầu tư chứng khoán",
//     author: "Trần Minh Chiến",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này hướng dẫn người đọc cách đầu tư vào chứng khoán. Tác giả Trần Minh Chiến trình bày các chiến lược đầu tư, phân tích cổ phiếu và thị trường chứng khoán. Nội dung sách cũng cung cấp thông tin về cách quản lý danh mục đầu tư và các rủi ro liên quan đến đầu tư chứng khoán. Đây là tài liệu cần thiết cho những ai muốn tham gia vào thị trường chứng khoán."
//   },
//   {
//     title: "Thị trường tài chính",
//     author: "Nguyễn Văn Hải",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này cung cấp cái nhìn tổng quan về thị trường tài chính. Tác giả Nguyễn Văn Hải phân tích các loại thị trường như thị trường tiền tệ, thị trường vốn và thị trường ngoại hối. Nội dung sách cũng đề cập đến các yếu tố ảnh hưởng đến thị trường tài chính và cách thức hoạt động của chúng, giúp người đọc hiểu rõ hơn về môi trường tài chính toàn cầu."
//   },
//   {
//     title: "Quản lý tài sản",
//     author: "Đỗ Hữu Hưng",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này hướng dẫn người đọc cách quản lý tài sản cá nhân và doanh nghiệp. Tác giả Đỗ Hữu Hưng chia sẻ các nguyên tắc quản lý tài sản, từ đầu tư đến bảo vệ tài sản. Nội dung sách còn đề cập đến các công cụ và chiến lược để tối ưu hóa giá trị tài sản, giúp người đọc xây dựng nền tảng tài chính vững chắc."
//   },
//   {
//     title: "Kế toán tài chính",
//     author: "Trần Văn Long",
//     genre: "66ef986c6316ce75499684e9",
//     major: "66ef9a0c6316ce7549968507",
//     summary: "Cuốn sách này cung cấp kiến thức cơ bản về kế toán tài chính. Tác giả Trần Văn Long hướng dẫn người đọc cách ghi chép, phân tích và báo cáo thông tin tài chính. Nội dung sách cũng đề cập đến các chuẩn mực kế toán và quy trình kiểm toán, giúp người đọc nắm bắt các nguyên tắc và quy định trong lĩnh vực kế toán."
//   },
// ];
const books = [
  {
    title: "Quản trị khách sạn",
    author: "Lê Hoàng Minh",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này cung cấp cái nhìn sâu sắc về quản trị khách sạn từ các khía cạnh như dịch vụ khách hàng, quản lý nhân sự, và tối ưu hóa quy trình. Tác giả Lê Hoàng Minh đưa ra những chiến lược cụ thể để nâng cao trải nghiệm của khách hàng và phát triển thương hiệu khách sạn. Cuốn sách còn phân tích các thách thức mà ngành khách sạn đang đối mặt trong bối cảnh cạnh tranh ngày càng gia tăng."
  },
  {
    title: "Marketing du lịch",
    author: "Trần Thị Hồng",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này khám phá các chiến lược marketing hiệu quả trong ngành du lịch. Tác giả Trần Thị Hồng cung cấp cái nhìn tổng quan về các kênh marketing truyền thống và hiện đại, cũng như cách xây dựng thương hiệu du lịch. Nội dung sách còn bao gồm những phân tích về hành vi người tiêu dùng và xu hướng tiêu dùng trong ngành du lịch, giúp các nhà quản lý có thể đưa ra quyết định đúng đắn."
  },
  {
    title: "Lữ hành và du lịch",
    author: "Nguyễn Thế Bình",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này trình bày những khái niệm cơ bản về lữ hành và du lịch, bao gồm lịch sử, văn hóa và phát triển ngành. Tác giả Nguyễn Thế Bình phân tích các mô hình lữ hành hiện nay, từ tour du lịch trọn gói đến du lịch tự túc. Cuốn sách còn cung cấp các kiến thức cần thiết để xây dựng các chương trình tour hấp dẫn và phù hợp với nhu cầu của khách hàng."
  },
  {
    title: "Kinh doanh dịch vụ du lịch",
    author: "Đinh Quốc Thắng",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này hướng dẫn các bước cần thiết để xây dựng và phát triển một doanh nghiệp dịch vụ du lịch. Tác giả Đinh Quốc Thắng chia sẻ các chiến lược kinh doanh, từ việc lựa chọn thị trường mục tiêu đến cách thức quảng bá dịch vụ. Nội dung sách cũng đề cập đến những thách thức và cơ hội trong ngành dịch vụ du lịch, giúp người đọc nắm bắt xu hướng phát triển."
  },
  {
    title: "Quản trị sự kiện",
    author: "Ngô Minh Tuấn",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này cung cấp kiến thức về quản trị sự kiện trong ngành du lịch. Tác giả Ngô Minh Tuấn trình bày quy trình tổ chức sự kiện từ khâu lên ý tưởng đến thực hiện và đánh giá. Nội dung sách cũng phân tích các yếu tố quan trọng để tạo ra một sự kiện thành công và hấp dẫn, từ việc lựa chọn địa điểm đến quản lý ngân sách."
  },
  {
    title: "Phát triển du lịch bền vững",
    author: "Vũ Thị Bích",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này tập trung vào phát triển du lịch bền vững, một xu hướng quan trọng trong ngành. Tác giả Vũ Thị Bích thảo luận về cách cân bằng giữa phát triển kinh tế và bảo vệ môi trường. Nội dung sách cung cấp những chiến lược và thực tiễn tốt để phát triển du lịch mà không gây hại đến tài nguyên thiên nhiên và văn hóa địa phương."
  },
  {
    title: "Du lịch văn hóa",
    author: "Nguyễn Văn Dũng",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này khám phá sự kết hợp giữa du lịch và văn hóa, đưa ra những hiểu biết sâu sắc về cách mà văn hóa ảnh hưởng đến ngành du lịch. Tác giả Nguyễn Văn Dũng phân tích các loại hình du lịch văn hóa, từ lễ hội đến di sản văn hóa. Nội dung sách cũng đề cập đến vai trò của người dân địa phương trong việc phát triển du lịch văn hóa."
  },
  {
    title: "Du lịch sinh thái",
    author: "Trần Văn Tâm",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này giới thiệu về du lịch sinh thái như một hình thức du lịch bền vững. Tác giả Trần Văn Tâm giải thích các nguyên tắc cơ bản của du lịch sinh thái, từ việc bảo vệ môi trường đến việc hỗ trợ cộng đồng địa phương. Nội dung sách còn nêu rõ các lợi ích của du lịch sinh thái đối với người dân và hệ sinh thái."
  },
  {
    title: "Quản lý rủi ro trong du lịch",
    author: "Lê Minh Nhất",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này cung cấp kiến thức về quản lý rủi ro trong ngành du lịch. Tác giả Lê Minh Nhất phân tích các loại rủi ro mà doanh nghiệp du lịch có thể gặp phải và cách để phòng tránh. Nội dung sách cũng đề cập đến tầm quan trọng của việc xây dựng kế hoạch ứng phó với khủng hoảng và bảo đảm an toàn cho khách hàng."
  },
  {
    title: "Du lịch trực tuyến",
    author: "Phạm Thị Mai",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này nghiên cứu về sự phát triển của du lịch trực tuyến trong thời đại công nghệ số. Tác giả Phạm Thị Mai phân tích cách mà internet đã thay đổi cách thức khách hàng tìm kiếm và đặt tour du lịch. Nội dung sách cũng cung cấp các chiến lược để doanh nghiệp du lịch tối ưu hóa sự hiện diện trực tuyến và nâng cao trải nghiệm khách hàng."
  },
  {
    title: "Tâm lý khách hàng trong du lịch",
    author: "Nguyễn Đức Huy",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này nghiên cứu tâm lý khách hàng trong ngành du lịch, giúp các doanh nghiệp hiểu rõ hơn về nhu cầu và hành vi của khách hàng. Tác giả Nguyễn Đức Huy cung cấp các phương pháp nghiên cứu và phân tích thị trường, từ đó đưa ra các chiến lược phù hợp. Nội dung sách cũng đề cập đến các yếu tố ảnh hưởng đến quyết định lựa chọn của khách hàng."
  },
  {
    title: "Thương mại điện tử trong du lịch",
    author: "Lê Văn Tuấn",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này tìm hiểu về vai trò của thương mại điện tử trong ngành du lịch. Tác giả Lê Văn Tuấn phân tích cách mà các nền tảng trực tuyến đã thay đổi cách thức giao dịch và marketing trong du lịch. Nội dung sách cũng đề cập đến các xu hướng mới trong thương mại điện tử và cách để doanh nghiệp tận dụng những cơ hội này."
  },
  {
    title: "Xây dựng thương hiệu du lịch",
    author: "Đỗ Minh Quân",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này trình bày quy trình xây dựng thương hiệu trong ngành du lịch. Tác giả Đỗ Minh Quân chia sẻ các nguyên tắc cốt lõi và chiến lược cụ thể để phát triển một thương hiệu du lịch mạnh mẽ. Nội dung sách cũng đề cập đến tầm quan trọng của thương hiệu trong việc tạo niềm tin và thu hút khách hàng."
  },
  {
    title: "Địa lý du lịch",
    author: "Nguyễn Thái Sơn",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này giới thiệu về địa lý du lịch, phân tích các yếu tố tự nhiên và xã hội ảnh hưởng đến sự phát triển của ngành du lịch. Tác giả Nguyễn Thái Sơn cung cấp các kiến thức cần thiết để hiểu rõ hơn về thị trường du lịch và cách thức khai thác tiềm năng địa lý. Nội dung sách còn bao gồm các ví dụ cụ thể từ các điểm đến nổi tiếng."
  },
  {
    title: "Chính sách phát triển du lịch",
    author: "Nguyễn Xuân Bình",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này khám phá các chính sách phát triển du lịch tại Việt Nam và trên thế giới. Tác giả Nguyễn Xuân Bình phân tích những thách thức và cơ hội trong việc xây dựng chính sách hiệu quả. Nội dung sách còn đề cập đến vai trò của chính phủ và các tổ chức trong việc thúc đẩy sự phát triển của ngành du lịch."
  },
  {
    title: "Dịch vụ du lịch và xu hướng tương lai",
    author: "Trần Quốc Duy",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này nêu ra các xu hướng mới trong ngành dịch vụ du lịch và dự đoán tương lai của ngành. Tác giả Trần Quốc Duy phân tích các yếu tố tác động đến sự phát triển của dịch vụ du lịch, từ công nghệ đến thay đổi hành vi tiêu dùng. Nội dung sách cũng cung cấp những chiến lược để các doanh nghiệp du lịch thích ứng với những thay đổi này."
  },
  {
    title: "Chất lượng dịch vụ trong du lịch",
    author: "Nguyễn Hải Đăng",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này đề cập đến chất lượng dịch vụ trong ngành du lịch, từ các yếu tố cấu thành đến cách đo lường chất lượng. Tác giả Nguyễn Hải Đăng đưa ra những tiêu chuẩn và phương pháp để cải thiện chất lượng dịch vụ, nhằm nâng cao sự hài lòng của khách hàng. Nội dung sách cũng phân tích các tình huống thực tế trong ngành du lịch để rút ra bài học."
  },
  {
    title: "Giải pháp phát triển du lịch Việt Nam",
    author: "Lê Thị Hương",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này đề xuất các giải pháp phát triển du lịch Việt Nam trong bối cảnh cạnh tranh toàn cầu. Tác giả Lê Thị Hương phân tích những lợi thế và thách thức mà Việt Nam đang đối mặt, từ văn hóa đến tự nhiên. Nội dung sách cũng đưa ra những chiến lược cụ thể để nâng cao vị thế của du lịch Việt Nam trên bản đồ du lịch thế giới."
  },
  {
    title: "Kỹ năng giao tiếp trong du lịch",
    author: "Nguyễn Tiến Nam",
    genre: "66ef984f6316ce75499684e5",
    major: "66ef9a146316ce7549968509",
    summary: "Cuốn sách này tập trung vào kỹ năng giao tiếp trong ngành du lịch, một yếu tố quan trọng để tạo dựng mối quan hệ với khách hàng. Tác giả Nguyễn Tiến Nam trình bày các phương pháp và kỹ thuật giao tiếp hiệu quả, từ việc lắng nghe đến cách xử lý tình huống khó khăn. Nội dung sách cũng bao gồm các bài tập thực hành để nâng cao kỹ năng giao tiếp cho người làm trong ngành."
  },
];


