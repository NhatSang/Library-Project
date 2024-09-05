import AddBookScreen from "./screens/book/AddBookScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddChapterScreen from "./screens/book/AddChapterScreen";
import './App.css'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AddBookScreen />} />
          <Route path="/add-chapter" element={<AddChapterScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
