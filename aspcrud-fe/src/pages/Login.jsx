import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:7122/api/Account/login', { username, password });
      if (response.status === 200) {
        console.log("berhasil login !!");
        localStorage.setItem('token', response.data.token);
        navigate('/parkir');
      }
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      alert("username or password incorret!!");
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-center text-white">Parking Mall</h1>
          <p className="text-lg text-gray-700 text-center">Efficiency at your fingertips.</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;