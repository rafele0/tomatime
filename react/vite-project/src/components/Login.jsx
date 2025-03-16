import { useState } from 'react';
import "../index.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("userId", data.id); 
      onLogin(data); 
    } else {
      setError(data.message);
    }
  };

  return (
    <div className='Login-Component' >

      <form onSubmit={handleLogin} className="login-form">
        <span className="title-form">LOGIN</span>
        {error && <p className="error"> {error}</p>}
        <input
          type="email"
          placeholder="yourmail@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='inputForm'
        />
        <input
          type="password"
          placeholder="***********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='inputForm'
        />
        <button type="submit" className='input-bnt'>LOGIN</button>
        <p className='textRegistration'>Not registered yet?<a href="/register" className='textRegistration'>Register now</a></p>
      </form>
    </div>
  );
};

export default Login;
