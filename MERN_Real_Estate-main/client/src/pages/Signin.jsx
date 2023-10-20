import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '@reduxjs/toolkit';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';

export default function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const[loading , error] = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatchEvent(signInStart);
      const res = await fetch('api/auth/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatchEvent(signInFailure(data.message));
        return;
      }
      dispatchEvent(signInSuccess(data))
      navigate("/")
    } catch (error) {
      dispatchEvent(signInFailure(error.message));
    }
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {Error && <p className='text-red-700 mt-5'>{Error}</p>}
    </div>
  )
}
