import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./pages/Login";
import Card from "./pages/admin/dashboard/Card";

import UserList from "./pages/admin/data-penduduk/UserList";
import EditUser from "./pages/admin/data-penduduk/EditUser";
import AddUser from "./pages/admin/data-penduduk/AddUser";

import PaymentList from "./pages/admin/kelola-keuangan/PaymentList";
import EditPrice from "./pages/admin/kelola-keuangan/EditPrice";
import EditStatus from "./pages/admin/kelola-keuangan/EditStatus";
import ProofOfPayment from "./pages/admin/kelola-keuangan/ProofOfPayment";

import NewsList from "./pages/admin/post-berita/NewsList";
import AddNews from "./pages/admin/post-berita/AddNews";
import EditNews from "./pages/admin/post-berita/EditNews";

function Admin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin" element={<Card />}></Route>

        <Route path="/admin/list-penduduk" element={<UserList />}></Route>
        <Route path="/admin/list-penduduk/add" element={<AddUser />} />
        <Route path="/admin/list-penduduk/edit/:id" element={<EditUser />} />

        <Route path="/admin/pembayaran" element={<PaymentList />} />
        <Route path="/admin/pembayaran/updateharga" element={<EditPrice />} />
        <Route path="/admin/pembayaran/edit/:id" element={<EditStatus />} />
        <Route path="/admin/buktipembayaran/:id" element={<ProofOfPayment />} />

        <Route path="/admin/berita" element={<NewsList />} />
        <Route path="/admin/berita/add" element={<AddNews />} />
        <Route path="/admin/berita/edit/:id" element={<EditNews />} />

        <Route path="/users" element></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Admin;
