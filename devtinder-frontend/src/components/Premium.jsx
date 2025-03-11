import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { base_url } from '../utils/constants';
const Premium = () => {
    const [isPremium, setIsPremium] = useState(false);
    useEffect(()=>{
        verifyPremiumUser()
    },[])

    const verifyPremiumUser = async () => {
        const res = await axios.get(base_url + "/premium/verify",
            { withCredentials: true })

        if (res.data.isPremium) {
            setIsPremium(true)
        }
    }

    const handleClick = async (type) => {
        const order = await axios.post(base_url + "/payment/create", {
            membershipType: type
        },
            { withCredentials: true })

        const { keyId, amount, currency, notes, orderId } = order.data;
        //it should open payment dialog box
        const options = {
            key: keyId, // Replace with your Razorpay key_id
            amount: amount,
            currency: currency,
            name: 'Devlopertinder',
            description: 'Test Transaction',
            order_id: orderId, // This is the order_id created in the backend
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
            },
            theme: {
                color: '#F37254'
            },
            handler: verifyPremiumUser()
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    return isPremium ? (<span>Already a premium user</span>) : (
        <div className='m-10'>
            <div class="flex w-full">
                <div class="card bg-base-300 rounded-box grid h-80 grow place-items-center"><h1 className='font-bold text-3xl'>Silver Membership</h1>
                    <ul>
                        <li>-Chat with other developers</li>
                        <li>100 connection requests per day</li>
                    </ul>
                    <button className='btn btn-primary' onClick={() => handleClick("sliver")}>Buy Silver</button>
                </div>
                <div class="divider divider-horizontal">OR</div>
                <div class="card bg-base-300 rounded-box grid h-80 grow place-items-center"><h1 className='font-bold text-3xl'>Gold membership</h1>  <ul>
                    <li>-Chat with other developers</li>
                    <li>Infinite connection requests per day</li>
                </ul>
                    <button className='btn btn-secondary' onClick={() => handleClick("gold")}>Buy Gold</button></div>
            </div>
        </div>
    )
}

export default Premium