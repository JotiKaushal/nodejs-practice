import axios from 'axios'
import React, { useEffect } from 'react'
import { base_url } from '../utils/constants'
import { useDispatch, useSelector } from "react-redux"
import { addConection } from '../utils/connectionSlice'
import { Link } from 'react-router'

const Conections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store => store.connection)
  const getConnections = async () => {
    if (connections.length > 0) return;
    try {
      const res = await axios.get(`${base_url}user/connections`, { withCredentials: true });
      console.log(res);
      dispatch(addConection(res.data.data))
    }
    catch (err) { console.log(err.message) }

  }

  useEffect(() => { getConnections() }, [])
  if (!connections) return
  if (connections.length === 0) return <h1 className='flex justify-center my-10'>No connection found</h1>
  return (
    <div className='text-center my-10'><h1 className='text-3xl font-bolds text-white'>Connections</h1>
      {
        connections.map((connection) => {
          const {_id, firstName, lastName, photoUrl, age, gender, about } = connection;
          return <div key={_id} className='flex justify-between gap-7 m-4 p-4 bg-base-200 w-1/2 mx-auto'>
            <div><image alt="photo url" className='w-20 h-20 rounded-full' src={photoUrl} /></div>
            <div className="text-left mx-4"> <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
            {age && gender && <p>{age +" " + gender}</p>}
              <p>{about}</p>
              </div>
              <Link to={"/chat/"+_id}><button className='btn btn-primary'>Chat</button></Link> 
          </div>
        })
      }
    </div>
  )
}

export default Conections