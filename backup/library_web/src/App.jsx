import Login from "./pages/auth/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import PrivateRoute from "./route/PrivateRoute";
import Home from "./pages/main/Home";
import Register from "./pages/auth/register";
import AuthLayout from "./pages/auth/AuthLayout";
import Layout from "./components/Layout";
import Genre from "./pages/main/Genre";
import Result from "./pages/main/Result";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/genre" element={<Genre />} />
            <Route path="/result" element={<Result />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
