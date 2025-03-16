import { useState } from 'react';
import "../index.css";

const Login = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className='Login-Component'>
      <form onSubmit={handleSubmit} className="login-form">
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