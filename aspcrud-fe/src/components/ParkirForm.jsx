/* eslint-disable react/prop-types */

const ParkirForm = ({
  typeTransportasi,
  typeTransportasiId,
  setTypeTransportasiId,
  plateNomor,
  setPlateNomor,
  waktuMasuk,
  setWaktuMasuk,
  handleSave,
  resetForm,
}) => {
  return (
    <div>
    <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-lg mb-6 animate-fade-in-down">
      <h1 className="text-3xl font-bold mb-6 text-center animate-pulse">Parkir Form</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2 animate-pulse">Type Transportasi:</label>
        
        <select
          value={typeTransportasiId}
          onChange={(e) => setTypeTransportasiId(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
          <option value="">Pilih Type Transportasi</option>
          {typeTransportasi.map((type) => (
            <option key={type.id} value={type.id}>
              {type.nama}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2 animate-pulse">Plate Nomor:</label>
        <input
          type="text"
          value={plateNomor}
          onChange={(e) => setPlateNomor(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2 animate-pulse ">Waktu Masuk:</label>
        <input
          type="datetime-local"
          value={waktuMasuk}
          onChange={(e) => setWaktuMasuk(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
          Simpan
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
          Reset
        </button>
      </div>
    </form>
    </div>
  );
};

export default ParkirForm;
