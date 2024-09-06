import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddBookPage from "./pages/book/AddBookPage";
import AddChapterPage from "./pages/book/AddChapterPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AddBookPage />} />
          <Route path="/add-chapter" element={<AddChapterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
