import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Books, Home, Users ,Notifications} from "./pages";
import { Layout } from "./components";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Users" element={<Users />} />
          <Route path="Books" element={<Books />} />
          <Route path="Notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
