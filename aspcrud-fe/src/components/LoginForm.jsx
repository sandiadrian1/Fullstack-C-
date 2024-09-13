import { useState} from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://localhost:7122/api/Account/login', { 
                username, 
                password 
            });

            if (response.status === 200) {
                console.log('Login successful');
                // Simpan token ke localStorage atau redirect ke halaman utama
                localStorage.setItem('token', response.data.token);
                window.location.href = '/Parkir.jsx';
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || 'Unknown error');
            setErrorMessage('Login gagal, periksa kembali username dan password Anda.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
