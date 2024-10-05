import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddBookPage from "./pages/book/AddBookPage";
import AddChapterPage from "./pages/book/AddChapterPage";
import AddBookTest from "./pages/book/AddBookTest";
import AddUserTest from "./pages/book/AddUserTest";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AddBookPage />} />
          <Route path="/add-chapter" element={<AddChapterPage />} />
          <Route path="/add-book-test" element={<AddBookTest />} />
          <Route path="/add-user-test" element={<AddUserTest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
