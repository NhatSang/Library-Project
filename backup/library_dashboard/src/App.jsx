import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Books from "./pages/Books";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Users" element={<Users />} />
          <Route path="Books" element={<Books />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
