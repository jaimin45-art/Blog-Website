import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice';
import { useNavigate, Link } from 'react-router-dom';
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName';

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
        dispatch(setUser(data.user));
        navigate(RouteIndex);
      } else {
        setErrorMsg(data.message);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6FFFA] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">
        
        {/* Top image */}
        <div className="w-full h-40 overflow-hidden">
          <img
            src="/public/girl.jpeg"
            alt="Login visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form content */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Hello again!</h2>

          <p className="text-gray-600 mb-6 text-sm">
            Enter your credentials to continue your journey into our blog world.
          </p>

          {errorMsg && <p className="text-red-500 mb-3 text-sm">{errorMsg}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-[#FFD6EC] hover:bg-[#ffb8e1] text-black font-semibold py-2 rounded transition"
            >
              Login
            </button>
          </form>

          <div className="text-right mt-2">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
          </div>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{' '}
            <Link to={RouteSignUp} className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
