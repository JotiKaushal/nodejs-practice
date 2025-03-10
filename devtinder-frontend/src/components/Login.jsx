import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import {base_url} from '../utils/constants';
const Login = () => {

  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${base_url}login`, {
        emailId,
        password
      },
    {withCredentials: true});
      dispatch(addUser(res.data.user));
      return navigate("/");
    }
    catch (err) {
      setError(err?.response?.data?.message || 'soemthing went wrong');
      console.log(err)
    }
  }

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${base_url}signup`, {
        emailId,
        password,
        firstName,
        lastName
      },
    {withCredentials: true});
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    }
    catch (err) {
      setError(err?.response?.data?.message || 'soemthing went wrong');
      console.log(err)
    }
  }
  return (
    <div className='flex justify-center my-20'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title  justify-center">{isLoginForm? "Login" : "Sign Up"}</h2>
          <div>
            {
              !isLoginForm &&
              <>
          <label className="form-control w-full max-w-xs my-2">
              <div className="label my-2">
                <span className="label-text">First Name</span>
              </div>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs  my-2">
              <div className="label my-2">
                <span className="label-text">Last Name</span>
              </div>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            </>
}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label my-2">
                <span className="label-text">Email ID</span>
              </div>
              <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs  my-2">
              <div className="label my-2">
                <span className="label-text">Password</span>
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
          </div>
          <p className='text-red-600'>{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "LOGIN" : "SIGN UP"}</button>
          </div>
          <p className='m-auto cursor-pointer py-2' onClick={()=>{setIsLoginForm(!isLoginForm)}}>{isLoginForm ?"New user? Signup here" : "Existing user? Login here"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login