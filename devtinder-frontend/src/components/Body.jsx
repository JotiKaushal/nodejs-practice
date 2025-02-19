import React, { useEffect } from 'react'
import NavBar from "./NavBar"
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import axios from 'axios'
import {base_url} from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user)
  const fetchUser = async() => {
    try{
      const res = await axios.get(`${base_url}profile/view`, {
        withCredentials: true
       });
       dispatch(addUser(res.data.user));
    }
    catch(err){
      if(err.status === 401){
      navigate("/login");
      }
      console.log(err);
    }
  }

  useEffect(()=>{ if(!userData){fetchUser()}}, [])

  return (
   <>
    <NavBar/>
    <Outlet></Outlet>
    <Footer/>
   </>
  )
}

export default Body