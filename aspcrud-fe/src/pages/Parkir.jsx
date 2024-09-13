import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ParkirForm from '../components/ParkirForm';
import ParkirDetail from '../components/ParkirDetail';
import ParkirList from '../components/ParkirList';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Clapperboard} from 'lucide-react';
import { Bike} from 'lucide-react';



const Parkir = () => {
  const [typeTransportasi, setTypeTransportasi] = useState([]);
  const [parkirs, setParkirs] = useState([]);
  const [id, setId] = useState(null);
  const [typeTransportasiId, setTypeTransportasiId] = useState(0);
  const [plateNomor, setPlateNomor] = useState('');
  const [waktuMasuk, setWaktuMasuk] = useState('');
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  // Cek apakah pengguna sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Arahkan ke halaman login jika belum login
    } else {
      loadTypeTransportasi(token);
      loadParkirs(token);
    }
  }, [navigate]);

  const loadTypeTransportasi = async (token) => {
    try {
      const response = await axios.get('https://localhost:7122/api/TypeTransportasi/GetTypeTransportasi', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTypeTransportasi(response.data);
    } catch (err) {
      console.error('Gagal mengambil data TypeTransportasi:', err);
    }
  };

  const loadParkirs = async (token) => {
    try {
      const response = await axios.get("https://localhost:7122/api/Parkir", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setParkirs(response.data);
    } catch (err) {
      console.error('Gagal mengambil data Parkir:', err);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const txid = parseInt(typeTransportasiId);
      const data = {
        typeTransportasiId: txid,
        plateNomor,
        waktuMasuk: new Date(waktuMasuk),
      };

      if (id === null) {
        await axios.post('https://localhost:7122/api/Parkir', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.put(`https://localhost:7122/api/Parkir/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      resetForm();
      loadParkirs(token);
      alert('Data parkir berhasil disimpan');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  const resetForm = () => {
    setId(null);
    setTypeTransportasiId('');
    setPlateNomor('');
    setWaktuMasuk('');
    setDetail(null);
  };

  const handleEdit = (parkir) => {
    setId(parkir.id);
    setTypeTransportasiId(parkir.typeTransportasiId);
    setPlateNomor(parkir.plateNomor);
    setWaktuMasuk(new Date(parkir.waktuMasuk).toISOString().substring(0, 16));
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      await axios.delete(`https://localhost:7122/api/Parkir/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resetForm();
      loadParkirs(token);
    }
  };

  const handleDetail = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://localhost:7122/api/Parkir/${id}/detail`, {
        params: { status },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDetail(response.data);
    } catch (err) {
      console.error(err);
      alert('Gagal mengambil detail parkir');
    }
  };

  return (
    <div>
    <header className="bg-green-600 text-white py-4">
    <nav className="container mx-auto">
      <ul className=" flex bg-origin-padding gap-10">
        <li><Link to="/parkir" className="hover:underline"><Clapperboard size={44} strokeWidth={2.75} /></Link></li>
        <li><Link to="/typeTransportasiCrud" className="hover:underline"><Bike  size={44} strokeWidth={2.75} /></Link></li>
        <li><Link to="/" className="hover:underline"><LogOut  size={44} strokeWidth={2.75} /></Link></li>
      </ul>
    </nav>
  </header>
    <div className="container mx-auto p-4">
      <ParkirForm
        typeTransportasi={typeTransportasi}
        typeTransportasiId={typeTransportasiId}
        setTypeTransportasiId={setTypeTransportasiId}
        plateNomor={plateNomor}
        setPlateNomor={setPlateNomor}
        waktuMasuk={waktuMasuk}
        setWaktuMasuk={setWaktuMasuk}
        handleSave={handleSave}
        resetForm={resetForm}
      />
      <ParkirList
        parkirs={parkirs}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleDetail={handleDetail}
      />
      <ParkirDetail detail={detail} />
    </div>
    </div>
  );
};

export default Parkir;
