import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../../../components/users/Navbar";
const EditStatus = () => {
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [hargaAir, setHargaAir] = useState("");
  const [air, setAir] = useState("");
  const [keamanan, setKeamanan] = useState("");
  const [kebersihan, setKebersihan] = useState("");
  const [total, setTotal] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setId(decoded.userId);
      setAir(decoded.air);
      setKeamanan(decoded.keamanan);
      setKebersihan(decoded.kebersihan);
      setExpire(decoded.exp);
      setStatus(decoded.status);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setId(decoded.userId);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/pembayaran/${id}`, {
        status,
      });
      navigate("/users/bayar");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ marginTop: "10%" }}>
        <h2>Bayar Iuran</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Air</th>
              <th>Keamanan</th>
              <th>Kebersihan</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr key={id}>
              <td>{name}</td>
              <td>Rp{air}</td>
              <td>Rp{keamanan},-</td>
              <td>Rp{kebersihan},-</td>
              <td>sda</td>
              <td>{status}</td>
            </tr>
          </tbody>
        </Table>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword" hidden>
            <Form.Label>Status</Form.Label>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              setStatus("menunggu konfirmasi");
            }}
          >
            Konfirmasi Pembayaran
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditStatus;
