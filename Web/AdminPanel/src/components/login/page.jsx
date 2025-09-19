import { useState } from 'react';
import { login } from '../../services/auth';
import './login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ username, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/';
      } else {
        setError('Credenciais inválidas');
      }
    } catch {
      setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
