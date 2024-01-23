import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
// import axios from 'axios'
import {signInStart, signInSuccess, signInFailure, resetError} from '../redux/user/userSlice';
import {useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import { useEffect } from 'react';

const SignIn = () => {
  const [formData, setformData] = useState({})
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);
  const handleChange = (e) => {
    setformData({...formData, [e.target.id]: e.target.value});
  }
  const handleSubmit = async(e) => {
    e.preventDefault(); //to prevent refreshing page while saving data
    // axios.post('/api/auth/signup', formData)
    // .then((response) => {
    //   console.log(response);
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })
    try{
      // setLoading(true);
      dispatch(signInStart());
      // setError(false);
      const res = await fetch('api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if(data.success === false){
      // setError(true);
      dispatch(signInFailure(data));
      return;
    }   
    // setLoading(false);
    console.log(data);
    dispatch(signInSuccess(data));
    navigate('/');
    }
    catch (error) {
      // setLoading(false);
      // setError(true);
      dispatch(signInFailure(error));
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='Email' 
        id='email' className='bg-slate-100 p-3 rounded-t-lg'
        onChange={handleChange}/>
        <input type='password' placeholder='Password' 
        id='password' className='bg-slate-100 p-3 rounded-t-lg'
        onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95 
        disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error ? error.message || "Something went wrong!": ""}</p>
    </div>
  )
}

export default SignIn
