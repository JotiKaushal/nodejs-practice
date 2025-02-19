import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { base_url } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();
    const saveProfile = async () => {
        try {
            const res = await axios.patch(base_url + 'profile/edit', { firstName, lastName, age, gender, about, photoUrl }, { withCredentials: true });
            dispatch(addUser(res.data.user))
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
        catch (err) { setError(err.message) }
    }

    return (
        <div className='flex justify-center my-5'>
           {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Updated successfully.</span>
                </div>
            </div>}
            <div className='flex justify-center mx-10'>
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title  justify-center">Profile</h2>
                        <div>
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
                            <label className="form-control w-full max-w-xs  my-2">
                                <div className="label my-2">
                                    <span className="label-text">Age</span>
                                </div>
                                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            </label>
                            <label className="form-control w-full max-w-xs  my-2">
                                <div className="label my-2">
                                    <span className="label-text">Gender</span>
                                </div>
                                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            </label>
                            <label className="form-control w-full max-w-xs  my-2">
                                <div className="label my-2">
                                    <span className="label-text">About</span>
                                </div>
                                <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            </label>
                            <label className="form-control w-full max-w-xs  my-2">
                                <div className="label my-2">
                                    <span className="label-text">Photo URL</span>
                                </div>
                                <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            </label>
                        </div>
                        <p className='text-red-600'>{error}</p>
                        <div className="card-actions justify-center m-2">
                            <button className="btn btn-primary" onClick={saveProfile}>update</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={user} />
        </div>
    )
}

export default EditProfile