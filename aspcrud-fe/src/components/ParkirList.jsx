/* eslint-disable react/prop-types */
// import React from "react";

const ParkirList = ({ parkirs, handleEdit, handleDelete, handleDetail }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Daftar Parkir</h2>
      <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in-up">
        <thead>
          <tr className="bg-blue-500 text-white">
            
            <th className="p-4 animate-fade-in-L">Type Transportasi</th>
            <th className="p-4 animate-fade-in-L">Plate Nomor</th>
            <th className="p-4 animate-fade-in-R">Waktu Masuk</th>
            <th className="p-4 animate-fade-in-R">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {parkirs.map((parkir) => (
            <tr key={parkir.id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
              
              <td className="p-4 text-center animate-fade-in-L">{parkir.typeTransportasi.nama}</td>
              <td className="p-4 text-center animate-fade-in-L">{parkir.plateNomor}</td>
              <td className="p-4 text-center animate-fade-in-R">{new Date(parkir.waktuMasuk).toLocaleString()}</td>
              <td className="p-4 text-center animate-fade-in-R">
                <button
                  onClick={() => handleEdit(parkir)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(parkir.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 mr-2"
                >
                  Hapus
                </button>
                <button
                  onClick={() => handleDetail(parkir.id, 'belum bayar')}
                  className="bg-green-500 text-white py-1 px-3 rounded-lg shadow-md"
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParkirList;
