import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { SquareParking} from 'lucide-react';
import { Bike } from "lucide-react";



function TypeTransportasiCrud() {
  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  const [biayaPerJam, setBiayaPerJam] = useState("");
  const [typeTransportasi, setTypeTransportasi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    setLoading(true);
    try {
      const result = await axios.get(
        "https://localhost:7122/api/TypeTransportasi/GetTypeTransportasi"
      );
      setTypeTransportasi(result.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  }

  async function Save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7122/api/TypeTransportasi/AddTypeTransportasi", {
        Nama: nama,
        BiayaPerJam: biayaPerJam,
      });
      alert("Berhasil menambahkan type transportasi");
      clearForm();
      Load();
    } catch (err) {
      alert("Error: " + err);
    }
  }

  function EditType(typeTransportasi) {
    setNama(typeTransportasi.nama);
    setBiayaPerJam(typeTransportasi.biayaPerJam);
    setId(typeTransportasi.id);
  }

  async function Delete(id) {
    try {
      await axios.delete("https://localhost:7122/api/TypeTransportasi/DeleteTypeTransportasi/" + id);
      alert("Berhasil Menghapus");
      clearForm();
      Load();
    } catch (err) {
      alert("Error: " + err);
    }
  }

  async function Update(event) {
    event.preventDefault();
    try {
      await axios.patch("https://localhost:7122/api/TypeTransportasi/UpdateTypeTransportasi/" + id, {
        Id: id,
        Nama: nama,
        BiayaPerJam: biayaPerJam,
      });
      alert("Update berhasil!");
      clearForm();
      Load();
    } catch (err) {
      alert("Error: " + err);
    }
  }

  function clearForm() {
    setId("");
    setNama("");
    setBiayaPerJam("");
  }

  return (
    <div>
    <header className="bg-green-600 text-white py-4">
    <nav className="container mx-auto">
      <ul className=" flex bg-origin-padding gap-10">
        <li><Link to="/parkir" className="hover:underline"><SquareParking  size={44} strokeWidth={2.75} /></Link></li>
        <li><Link to="/typeTransportasiCrud" className="hover:underline"><Bike size={44} strokeWidth={2.75} /></Link></li>
        <li><Link to="/" className="hover:underline">< LogOut  size={44} strokeWidth={2.75} /></Link></li>
      </ul>
    </nav>
  </header>
    <div className="max-w-4xl mx-auto p-4">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
        <form className="animate-fade-in-up" onSubmit={id ? Update : Save}>
      <h1 className="text-3xl font-bold text-center mb-8 animate-pulse">Type Transportasi</h1>
          <div className="form-group mb-4">
            <label htmlFor="nama" className="block text-lg font-semibold mb-2">Nama</label>
            <input
              type="text"
              className="form-control w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              id="nama"
              value={nama}
              onChange={(event) => setNama(event.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="biayaPerJam" className="block text-lg font-semibold mb-2">Biaya Per Jam</label>
            <input
              type="number"
              className="form-control w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              id="biayaPerJam"
              value={biayaPerJam}
              onChange={(event) => setBiayaPerJam(event.target.value)}
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              type="submit"
            >
              {id ? "Update" : "Register"}
            </button>
            {id && (
              <button
                type="button"
                className="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                onClick={clearForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <br />
      <table className="table-auto w-full mt-8 animate-fade-in-down">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Type Transportasi Id</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Biaya Per Jam</th>
            <th className="px-4 py-2">Option</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center py-4">Loading...</td>
            </tr>
          ) : typeTransportasi.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">No data available</td>
            </tr>
          ) : (
            typeTransportasi.map((item) => (
              <tr
                key={item.id}
                className="bg-white hover:bg-gray-100 transition duration-150"
              >
                <td className="border px-4 py-2 animate-fade-in-L">{item.id}</td>
                <td className="border px-4 py-2 animate animate-fade-in-L">{item.nama}</td>
                <td className="border px-4 py-2 animate animate-fade-in-R">{item.biayaPerJam}</td>
                <td className="border px-4 py-2">
                  <button
                    className=" animate-fade-in-Rbtn btn-warning bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 transition duration-200 mr-2"
                    onClick={() => EditType(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-200"
                    onClick={() => Delete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default TypeTransportasiCrud;
