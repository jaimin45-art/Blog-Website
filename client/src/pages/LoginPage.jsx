import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice';
import { useNavigate } from 'react-router-dom';
import { RouteIndex } from '@/helpers/RouteName';
import { Link } from 'react-router-dom';
import { RouteSignUp } from '@/helpers/RouteName';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(setUser(data.user)); // 🔥 SET USER IN REDUX
        navigate(RouteIndex);         // 🔄 NAVIGATE TO HOMEPAGE
      } else {
        setErrorMsg(data.message);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          className="border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
      <p className="text-center mt-4 text-sm">
  Don't have an account?{' '}
  <Link to={RouteSignUp} className="text-blue-600 font-medium hover:underline">
    Sign Up
  </Link>
</p>
    </div>
  );
};

export default LoginPage;
