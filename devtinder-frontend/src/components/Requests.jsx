import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { base_url } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest,removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.request) 
    const fetchRequest = async () => {
        try {
            const res = await axios.get(`${base_url}user/requests/received`, { withCredentials: true });
            dispatch(addRequest(res.data.data))
        }
        catch (err) { }
    }

    const reviewRequest = async (status, requestId) => {
        try {
            const res = await axios.post(`${base_url}request/review/${status}/${requestId}`, {}, { withCredentials: true })
            dispatch(removeRequest(requestId));
           
        }
        catch (err) { }
    }


    useEffect(() => { fetchRequest() }, [])
    if (!requests) return
    if (requests.length === 0) return <h1 className='flex justify-center my-10'>No request found</h1>
    return (
        <div className='text-center my-10'><h1 className='text-3xl font-bolds text-white'>Connection Requests</h1>
            {
                requests.map((request) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
                    return <div key={_id} className='flex justify-between items-center m-4 p-4 bg-base-200 w-2/3 mx-auto'>
                        <div><image alt="photo url" className='w-20 h-20 rounded-full' src={photoUrl} /></div>
                        <div className="text-left mx-4"> <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + " " + gender}</p>}
                            <p>{about}</p></div>
                        <div><button className="btn btn-primary mx-2" onClick={()=>{reviewRequest("rejected", request._id)}}>Reject</button>
                            <button className="btn btn-secondary mx-2" onClick={()=>{reviewRequest("accepted", request._id)}}>Accept</button></div>

                    </div>

                })
            }
        </div>
    )
}

export default Requests