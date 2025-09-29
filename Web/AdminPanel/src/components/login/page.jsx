import { useState } from 'react';
import './login.css';
import loginService from '../../services/login';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const service = new loginService()
    const data = await service.getLogin(username, password)

    if (data.result.success) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', data.result.token);
      localStorage.setItem('idUser', data.result.id_usuario);
      localStorage.setItem('nameUser', data.result.ds_usuario);
      localStorage.setItem('typeUser', data.result.id_tipo_usuario)
      window.location.reload();
    } else {
      setError('Usuário ou senha inválidos');
    } 
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bem vindo ao SGM</h2>
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
          <button type="submit" 
            onClick={()=> handleLogin()}
            disabled={(username.length <3) || (password.length <3)}
          >
            Entrar
          </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
