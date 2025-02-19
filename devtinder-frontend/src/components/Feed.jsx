import axios from 'axios'
import React, { useEffect } from 'react'
import {base_url} from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
const Feed = () => {
  const feed = useSelector(store => store.feed)
  const dispatch = useDispatch();
  const getFeed = async() => {
    if(feed) return;
    try{
     const res = await axios.get(`${base_url}feed`, {withCredentials: true});
     dispatch(addFeed(res.data.data))
     console.log(feed);
     
    }
    catch(err){}
   }
 
   useEffect(()=>{
    getFeed()
   }, [])
  return (
    feed?.length > 0 && (<div className='flex justify-center my-10'><UserCard user={feed[0]}/></div>)
  )
}

export default Feed