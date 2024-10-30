import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Books, Home, Users ,Notifications, AddBook, AddChapter, AddNotification} from "./pages";
import { Layout } from "./components";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/books" element={<Books />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
        <Route path="/books/add-book" element={<AddBook />} />
        <Route path="/books/add-chapter" element={<AddChapter />} />
        <Route path="/notification/add-notification" element={<AddNotification />} />
        <Route path="/notification/edit-notification" element={<AddNotification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
