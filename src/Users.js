import { BrowserRouter, Route, Routes } from "react-router-dom";
import Card from "./pages/users/dashboard/Card";
import Login from "./pages/Login";
import EditStatus from "./pages/users/kelola-keuangan/EditStatus";
import NewsList from "./pages/users/post-berita/NewsList";

function Users() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<Card />}></Route>
        <Route path="/users/bayar" element={<EditStatus />}></Route>
        <Route path="/users/berita" element={<NewsList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Users;
