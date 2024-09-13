/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
const ParkirDetail = ({ detail }) => {
  if (!detail) return null;

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Detail Parkir</h2>
      <p>ID Parkir: {detail.parkirId}</p>
      <p>Type Transportasi: {detail.namaType}</p>
      <p>Plate Nomor: {detail.plateNomor}</p>
      <p>Waktu Masuk: {new Date(detail.waktuMasuk).toLocaleString()}</p>
      <p>Biaya Per Jam: {detail.biayaPerJam}</p>
      <p>Biaya Parkir: {detail.biayaParkir}</p>
      <p>Status: {detail.status}</p>
      <button onClick={() => handleDetail(detail.parkirId, 'sudah bayar')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300">Sudah Bayar</button>

    </div>
  );
};

export default ParkirDetail;
